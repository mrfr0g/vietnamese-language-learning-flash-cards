import { Box, Button, Text } from "grommet";
import { Announce } from "grommet-icons";
import { useCallback, useContext, useState } from "react";
import { v4 as uuid } from "uuid";
import { StateContext } from "../contexts/StateContext";
import { PhraseForm, PhraseFormFields } from "../forms/PhraseForm";

interface CapturePhrasesScreenProps {
  onNextScreen: () => void;
}

export function CapturePhrasesScreen({
  onNextScreen,
}: CapturePhrasesScreenProps) {
  const [phrases, setPhrases] = useState<Array<PhraseFormFields>>([]);
  const { setPhrases: setPhrasesInState } = useContext(StateContext);

  const handleAddPhrase = useCallback(
    (update: PhraseFormFields) => {
      setPhrases([
        {
          id: uuid(),
          ...update,
        },
        ...phrases,
      ]);
    },
    [phrases, setPhrases]
  );

  const handleUpdatePhrase = useCallback(
    (update: PhraseFormFields) => {
      setPhrases(
        phrases.map((phrase) => {
          if (phrase.id !== update.id) {
            return phrase;
          }

          return {
            ...phrase,
            ...update,
          };
        })
      );
    },
    [phrases, setPhrases]
  );

  const handleGotoNextScreen = useCallback(() => {
    setPhrasesInState(phrases);
    onNextScreen();
  }, [phrases]);

  return (
    <Box
      width="large"
      pad="small"
      border={{
        side: "all",
      }}
      style={{
        borderRadius: 4,
      }}
      align="center"
    >
      <Box direction="row" align="center">
        <Text as="h1">Add a phrase</Text>
        <Button
          style={{
            padding: 0,
            paddingBottom: 4,
            borderBottom: "1px solid",
          }}
          icon={
            <Announce
              color="brand"
              style={{
                width: "24px",
                height: "24px",
              }}
            />
          }
          onClick={handleGotoNextScreen}
        />
      </Box>
      <PhraseForm onSubmit={handleAddPhrase} />
      <Box>
        {phrases.map((phrase, i) => (
          <PhraseForm
            key={phrase.id}
            defaultValues={phrase}
            alternateBackground={i % 2 === 0}
            onSubmit={handleUpdatePhrase}
          />
        ))}
      </Box>
    </Box>
  );
}
