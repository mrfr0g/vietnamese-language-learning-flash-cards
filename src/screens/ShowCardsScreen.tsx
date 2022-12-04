import { Box } from "grommet";
import { useContext } from "react";
import { PhraseCard } from "../cards/PhraseCard";
import { StateContext } from "../contexts/StateContext";

export function ShowCardsScreen() {
  const { phrases } = useContext(StateContext);

  return (
    <Box gap="small" direction="row">
      {phrases.map((phrase) => {
        return <PhraseCard key={phrase.id} phrase={phrase} />;
      })}
    </Box>
  );
}
