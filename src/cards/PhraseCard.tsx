import { Card, CardBody, CardFooter, Text } from "grommet";
import { Play } from "grommet-icons";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { RecordAudioButton } from "../buttons/RecordAudioButton";
import { RoundButton } from "../buttons/RoundButton";
import { Base64, PhraseTTLContext } from "../contexts/PhraseTTLContext";
import { PhraseFormFields } from "../forms/PhraseForm";
import { createAudioBuffer } from "../utils/createAudioBuffer";
import { filterData, parseData, trimFront } from "../utils/parseData";
import { playSound } from "../utils/playSound";
import { xcorr } from "../utils/xcorr";
import { WaveformVisualization } from "./WaveformVisualization";

type PredictResponse = {
  avg_durations: Array<number>;
  data: Array<Base64>;
  durations: Array<number>;
};

interface PhraseCardProps {
  phrase: PhraseFormFields;
}

export function PhraseCard({ phrase }: PhraseCardProps) {
  const { ttls, setTtl } = useContext(PhraseTTLContext);
  const [waveformData, setWaveformData] = useState<Array<number>>([]);
  const [recordedWaveformData, setRecordedWaveformData] = useState<
    Array<number>
  >([]);
  const [recordedAudioBuffer, setRecordedAudioBuffer] = useState<AudioBuffer>();

  const phraseAudioBuffer = useMemo(async () => {
    let phraseSoundBase64 = ttls[phrase.phrase];

    if (!phraseSoundBase64) {
      const { data }: PredictResponse = await fetch(
        "https://ntt123-viettts.hf.space/api/predict/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            data: [phrase.phrase],
          }),
        }
      ).then((response) => response.json());

      phraseSoundBase64 = data[0];
      setTtl(phrase.phrase, phraseSoundBase64);
    }

    const phraseSound = await createAudioBuffer(
      phraseSoundBase64.replace("data:audio/wav;base64,", "")
    );

    return phraseSound;
  }, [ttls, setTtl]);

  useEffect(() => {
    phraseAudioBuffer.then((buf) => {
      setWaveformData(parseData(buf));
    });
  }, [phraseAudioBuffer, setWaveformData]);

  const speakPhrase = useCallback(async () => {
    playSound(await phraseAudioBuffer);
  }, [phraseAudioBuffer, setWaveformData]);

  const recordPhrase = useCallback(
    async (content: string) => {
      const phraseSound = await createAudioBuffer(
        content.replace("data:application/octet-stream;base64,", "")
      );

      setRecordedAudioBuffer(phraseSound);
      setRecordedWaveformData(parseData(phraseSound));
    },
    [setRecordedWaveformData, setRecordedAudioBuffer]
  );

  // Compare waveforms
  useEffect(() => {
    phraseAudioBuffer.then((buf) => {
      if (!recordedAudioBuffer) {
        return;
      }

      const phraseData = trimFront(filterData(buf, buf.length));
      let recordedData = trimFront(
        filterData(recordedAudioBuffer, recordedAudioBuffer.length)
      );

      // Ensure arrays are a power of 2 for comparison
      const nextLen = Math.pow(
        2,
        Math.ceil(Math.log(phraseData.length) / Math.log(2))
      );

      while (phraseData.length < nextLen) {
        phraseData.push(0);
      }

      // Normalize data to the same length //
      recordedData = recordedData.slice(0, phraseData.length);

      // Append short recordings with 0
      if (recordedData.length < phraseData.length) {
        while (recordedData.length < phraseData.length) {
          recordedData.push(0);
        }
      }

      // Compare waveforms
      console.log(xcorr(phraseData, recordedData));
    });
    // if (!recordedWaveformData.length) {
    //   return;
    // }

    // for (let i = 0; i < waveformData.length; i++) {
    //   const start = i * 32;
    //   const end = start + 32;
    //   const ttlBuffer: Array<number> = Array.prototype.slice.call(
    //     waveformData,
    //     start,
    //     end
    //   );
    //   const recordedWaveBuffer: Array<number> = Array.prototype.slice.call(
    //     recordedWaveformData,
    //     start,
    //     end
    //   );

    //   try {
    //     console.log(xcorr(ttlBuffer, recordedWaveBuffer));
    //   } catch (e) {
    //     console.log("e", e);
    //     break;
    //   }
    // }
  }, [phraseAudioBuffer, recordedAudioBuffer]);

  return (
    <Card pad="medium">
      <CardBody>
        <Text>{phrase.phrase}</Text>
        <WaveformVisualization data={waveformData} />
        <WaveformVisualization data={recordedWaveformData} />
      </CardBody>
      <CardFooter direction="row" justify="end" gap="small">
        <RecordAudioButton onChange={recordPhrase} />
        <RoundButton
          icon={<Play color="brand" size="small" />}
          onClick={speakPhrase}
        />
      </CardFooter>
    </Card>
  );
}
