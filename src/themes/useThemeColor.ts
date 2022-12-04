import { ThemeContext, ThemeContextI, ThemeType } from "grommet";
import { useContext } from "react";

type ThemeInstance = ThemeType & {
  dark?: boolean;
};

export function useThemeColor(colorKey: string): string {
  const theme: ThemeInstance = useContext(ThemeContext);
  const dark = theme.dark ?? false;
  const colors = theme.global?.colors ?? {};
  const colorCandidate = colors[colorKey];

  if (!colorCandidate) {
    return "#000";
  }

  return (
    (typeof colorCandidate === "string"
      ? colorCandidate
      : colorCandidate[dark ? "dark" : "light"]) ?? "#000"
  );
}
