import { Button, ButtonExtendedProps } from "grommet";

export function RoundButton(props: ButtonExtendedProps) {
  return (
    <Button
      plain
      style={{
        height: 32,
        width: 32,
        alignSelf: "center",
        textAlign: "center",
        borderRadius: 25,
        padding: 5,
        boxShadow: "0px 0px 2px #000",
      }}
      {...props}
    />
  );
}
