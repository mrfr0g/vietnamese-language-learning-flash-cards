import { Box } from "grommet";
import { useCallback, useState } from "react";
import { PhraseTTLContextProvider } from "./contexts/PhraseTTLContext";
import { StateContextProvider } from "./contexts/StateContext";
import { CapturePhrasesScreen } from "./screens/CapturePhrasesScreen";
import { ShowCardsScreen } from "./screens/ShowCardsScreen";

type Screen = "capture-phrases" | "show-cards";

function App() {
  const [screen, setScreen] = useState<Screen>("capture-phrases");
  const handleGotoScreen = useCallback(() => {
    switch (screen) {
      case "capture-phrases":
        setScreen("show-cards");
        break;
      case "show-cards":
        setScreen("capture-phrases");
        break;
    }
  }, [screen, setScreen]);

  const ScreenComponent =
    screen === "capture-phrases" ? CapturePhrasesScreen : ShowCardsScreen;

  return (
    <StateContextProvider>
      <PhraseTTLContextProvider>
        <Box>
          <ScreenComponent onNextScreen={handleGotoScreen} />
        </Box>
      </PhraseTTLContextProvider>
    </StateContextProvider>
  );
}

export default App;
