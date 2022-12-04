import { createContext, useState } from "react";
import { PhraseFormFields } from "../forms/PhraseForm";

type StateContext = {
  phrases: Array<PhraseFormFields>;
  setPhrases: (phrases: Array<PhraseFormFields>) => void;
};

export const StateContext = createContext<StateContext>({
  phrases: [],
  setPhrases: (_phrases: Array<PhraseFormFields>) => {},
});

interface StateContextProviderProps {
  children: React.ReactNode;
}

export function StateContextProvider({ children }: StateContextProviderProps) {
  const [phrases, setPhrases] = useState<Array<PhraseFormFields>>([]);

  return (
    <StateContext.Provider
      value={{
        phrases,
        setPhrases,
      }}
    >
      {children}
    </StateContext.Provider>
  );
}
