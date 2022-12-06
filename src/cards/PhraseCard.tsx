import { Box, Card, CardBody, CardFooter, Text } from "grommet";
import { Play } from "grommet-icons";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { RecordAudioButton } from "../buttons/RecordAudioButton";
import { RoundButton } from "../buttons/RoundButton";
import { Base64, PhraseTTLContext } from "../contexts/PhraseTTLContext";
import { PhraseFormFields } from "../forms/PhraseForm";
import { chunk } from "../utils/array";
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
  const [phraseComparisonResult, setPhraseComparisonResult] = useState<
    Array<number>
  >([]);
  const [phraseDuration, setPhraseDuration] = useState(0);

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
      setPhraseDuration(buf.duration);
    });
  }, [phraseAudioBuffer, setWaveformData, setPhraseDuration]);

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

      // Trim off empty initial sound
      const phraseData = trimFront(filterData(buf, buf.length));
      let recordedData = trimFront(
        filterData(recordedAudioBuffer, recordedAudioBuffer.length)
      );

      // Split waveform into chunks by phrase breaks and compare chunks
      // The idea is to be able to compare the words individually.
      // This won't always be correct, because words do not take a uniform
      // amount of time in the waveform, but it should give us an idea of
      // accuracy by word.

      const phraseWordsLength = phrase.phrase.split(" ").length;
      const phraseChunks = chunk(
        phraseData,
        phraseData.length / phraseWordsLength
      );
      const recordedChunks = chunk(
        recordedData,
        phraseData.length / phraseWordsLength
      );

      const result = [];

      phraseChunks.forEach((chunk, i) => {
        const phraseChunk = chunk;
        const recordedChunk = recordedChunks[i];

        // Pad chunk to nearest pow(2)
        const nextLen = Math.pow(
          2,
          Math.ceil(Math.log(phraseChunk.length) / Math.log(2))
        );

        while (phraseChunk.length < nextLen) {
          phraseChunk.push(0);
          recordedChunk.push(0);
        }

        // Compare words
        result.push(xcorr(phraseChunk, recordedChunk).xcorrMax);
      });

      setPhraseComparisonResult(result);
    });
  }, [phraseAudioBuffer, recordedAudioBuffer, setPhraseComparisonResult]);

  const parsedPhraseComparisonResult = useMemo(() => {
    const phraseParts = phrase.phrase.split(" ");
    return phraseComparisonResult.map((result, i) => {
      let color;
      if (result >= 0.75) {
        color = "green";
      }
      if (result < 0.75) {
        color = "rgb(234, 230, 10)";
      }
      if (result < 0.5) {
        color = "#ffb300";
      }
      if (result < 0.25) {
        color = "red";
      }

      return {
        result,
        word: phraseParts[i],
        color,
      };
    });
  }, [phraseComparisonResult]);

  return (
    <Card pad="medium">
      <CardBody>
        {phraseComparisonResult && phraseComparisonResult.length ? (
          <Box direction="row" gap="xxsmall">
            {parsedPhraseComparisonResult.map((result, i) => (
              <Text
                style={{
                  background: "black",
                }}
                key={result.word + i}
                color={result.color}
                title={`Result: ${result.result}`}
              >
                {result.word}{" "}
              </Text>
            ))}
          </Box>
        ) : (
          <Text>{phrase.phrase}</Text>
        )}
        <WaveformVisualization data={waveformData} />
        <WaveformVisualization data={recordedWaveformData} />
      </CardBody>
      <CardFooter direction="row" justify="end" gap="small">
        <RecordAudioButton
          stopAfterSeconds={phraseDuration + 1}
          onChange={recordPhrase}
        />
        <RoundButton
          icon={<Play color="brand" size="small" />}
          onClick={speakPhrase}
        />
      </CardFooter>
    </Card>
  );
}
