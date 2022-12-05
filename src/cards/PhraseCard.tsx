import { Card, CardBody, CardFooter, Text } from "grommet";
import { Play } from "grommet-icons";
import { useCallback, useContext, useState } from "react";
import { RecordAudioButton } from "../buttons/RecordAudioButton";
import { RoundButton } from "../buttons/RoundButton";
import { Base64, PhraseTTLContext } from "../contexts/PhraseTTLContext";
import { PhraseFormFields } from "../forms/PhraseForm";
import { createAudioBuffer } from "./createAudioBuffer";
import { parseData } from "./parseData";
import { playSound } from "./playSound";
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

  const speakPhrase = useCallback(async () => {
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

    setWaveformData(parseData(phraseSound));

    playSound(phraseSound);
  }, [ttls, setTtl, setWaveformData]);

  const recordPhrase = useCallback(
    async (content: string) => {
      const phraseSound = await createAudioBuffer(
        content.replace("data:application/octet-stream;base64,", "")
      );

      setRecordedWaveformData(parseData(phraseSound));
    },
    [setRecordedWaveformData]
  );

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
