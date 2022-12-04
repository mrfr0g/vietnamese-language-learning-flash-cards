import { Button, Card, CardBody, CardFooter, Text } from "grommet";
import { Play } from "grommet-icons";
import { useCallback, useContext, useState } from "react";
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

  return (
    <Card pad="medium">
      <CardBody>
        <Text>{phrase.phrase}</Text>
        <WaveformVisualization data={waveformData} />
      </CardBody>
      <CardFooter>
        <Button
          icon={<Play color="brand" size="small" />}
          plain
          style={{
            borderRadius: 25,
            padding: 5,
            boxShadow: "0px 0px 2px #000",
          }}
          onClick={speakPhrase}
        />
      </CardFooter>
    </Card>
  );
}
