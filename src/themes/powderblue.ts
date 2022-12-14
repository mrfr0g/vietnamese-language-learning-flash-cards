import { ThemeType } from "grommet";

type ExtendedTheme = ThemeType & {
  text: {
    xxsmall: {
      size: string;
      height: string;
      maxWidth: string;
    };
  };
  global: {
    colors: {
      "brand-accent": {
        dark: string;
        light: string;
      };
      "brand-contrast": string;
    };
  };
};

export const PowderBlueTheme: ExtendedTheme = {
  global: {
    colors: {
      brand: {
        dark: "#CBDDF5",
        light: "#5E7DA8",
      },
      "brand-accent": {
        dark: "#4D4C49",
        light: "#F8F5EE",
      },
      "brand-contrast": "#A8966A",
      background: {
        dark: "#111111",
        light: "#FFFFFF",
      },
      "background-back": {
        dark: "#111111",
        light: "#EEEEEE",
      },
      "background-front": {
        dark: "#222222",
        light: "#FFFFFF",
      },
      "background-contrast": {
        dark: "#FFFFFF11",
        light: "#11111111",
      },
      text: {
        dark: "#EEEEEE",
        light: "#333333",
      },
      "text-strong": {
        dark: "#FFFFFF",
        light: "#000000",
      },
      "text-weak": {
        dark: "#CCCCCC",
        light: "#444444",
      },
      "text-xweak": {
        dark: "#999999",
        light: "#666666",
      },
      border: {
        dark: "#444444",
        light: "#CCCCCC",
      },
      control: "brand",
      "active-background": "background-contrast",
      "active-text": "text-strong",
      "selected-background": "brand",
      "selected-text": "text-strong",
      "status-critical": "#FF4040",
      "status-warning": "#FFAA15",
      "status-ok": "#00C781",
      "status-unknown": "#CCCCCC",
      "status-disabled": "#CCCCCC",
      "graph-0": "brand",
      "graph-1": "status-warning",
    },
    font: {
      family: "Lato, sans-serif",
      size: "15px",
      height: "20px",
      maxWidth: "300px",
    },
    active: {
      background: "active-background",
      color: "active-text",
    },
    hover: {
      background: "active-background",
      color: "active-text",
    },
    selected: {
      background: "selected-background",
      color: "selected-text",
    },
    control: {
      border: {
        radius: "4px",
      },
    },
    drop: {
      border: {
        radius: "4px",
      },
    },
    borderSize: {
      xsmall: "1px",
      small: "2px",
      medium: "3px",
      large: "10px",
      xlarge: "20px",
    },
    breakpoints: {
      small: {
        value: 640,
        borderSize: {
          xsmall: "1px",
          small: "2px",
          medium: "3px",
          large: "5px",
          xlarge: "10px",
        },
        edgeSize: {
          none: "0px",
          hair: "1px",
          xxsmall: "2px",
          xsmall: "3px",
          small: "5px",
          medium: "10px",
          large: "20px",
          xlarge: "40px",
        },
        size: {
          xxsmall: "20px",
          xsmall: "40px",
          small: "80px",
          medium: "160px",
          large: "320px",
          xlarge: "640px",
          full: "100%",
        },
      },
      medium: {
        value: 1280,
      },
      large: {},
    },
    edgeSize: {
      none: "0px",
      hair: "1px",
      xxsmall: "3px",
      xsmall: "5px",
      small: "10px",
      medium: "20px",
      large: "40px",
      xlarge: "80px",
      responsiveBreakpoint: "small",
    },
    input: {
      padding: "10px",
      weight: 600,
    },
    spacing: "20px",
    size: {
      xxsmall: "40px",
      xsmall: "80px",
      small: "160px",
      medium: "320px",
      large: "640px",
      xlarge: "960px",
      xxlarge: "1280px",
      full: "100%",
    },
  },
  tip: {
    content: {
      background: {
        color: "background",
      },
      elevation: "none",
      round: false,
    },
  },
  button: {
    border: {
      width: "2px",
      radius: "4px",
    },
    padding: {
      vertical: "3px",
      horizontal: "18px",
    },
  },
  checkBox: {
    check: {
      radius: "4px",
    },
    toggle: {
      radius: "20px",
      size: "40px",
    },
    size: "20px",
  },
  radioButton: {
    size: "20px",
  },
  formField: {
    border: {
      color: "border",
      error: {
        color: {
          dark: "white",
          light: "status-critical",
        },
      },
      position: "inner",
      side: "bottom",
    },
    content: {
      pad: "small",
    },
    disabled: {
      background: {
        color: "status-disabled",
        opacity: "medium",
      },
    },
    error: {
      color: "status-critical",
      margin: {
        vertical: "xsmall",
        horizontal: "small",
      },
    },
    help: {
      color: "dark-3",
      margin: {
        start: "small",
      },
    },
    info: {
      color: "text-xweak",
      margin: {
        vertical: "xsmall",
        horizontal: "small",
      },
    },
    label: {
      margin: {
        vertical: "xxsmall",
        horizontal: "xsmall",
      },
    },
    margin: {
      bottom: "0",
    },
  },
  calendar: {
    small: {
      fontSize: "13px",
      lineHeight: 1.375,
      daySize: "22.86px",
    },
    medium: {
      fontSize: "15px",
      lineHeight: 1.45,
      daySize: "45.71px",
    },
    large: {
      fontSize: "20px",
      lineHeight: 1.11,
      daySize: "91.43px",
    },
  },
  clock: {
    analog: {
      hour: {
        width: "7px",
        size: "20px",
      },
      minute: {
        width: "3px",
        size: "10px",
      },
      second: {
        width: "3px",
        size: "8px",
      },
      size: {
        small: "60px",
        medium: "80px",
        large: "120px",
        xlarge: "180px",
        huge: "240px",
      },
    },
    digital: {
      text: {
        xsmall: {
          size: "11.666666666666666px",
          height: 1.5,
        },
        small: {
          size: "13.333333333333334px",
          height: 1.43,
        },
        medium: {
          size: "15px",
          height: 1.375,
        },
        large: {
          size: "16.666666666666668px",
          height: 1.167,
        },
        xlarge: {
          size: "18.333333333333332px",
          height: 1.1875,
        },
        xxlarge: {
          size: "21.666666666666668px",
          height: 1.125,
        },
      },
    },
  },
  heading: {
    level: {
      "1": {
        small: {
          size: "22px",
          height: "27px",
          maxWidth: "433px",
        },
        medium: {
          size: "28px",
          height: "33px",
          maxWidth: "567px",
        },
        large: {
          size: "42px",
          height: "47px",
          maxWidth: "833px",
        },
        xlarge: {
          size: "55px",
          height: "60px",
          maxWidth: "1100px",
        },
      },
      "2": {
        small: {
          size: "20px",
          height: "25px",
          maxWidth: "400px",
        },
        medium: {
          size: "25px",
          height: "30px",
          maxWidth: "500px",
        },
        large: {
          size: "30px",
          height: "35px",
          maxWidth: "600px",
        },
        xlarge: {
          size: "35px",
          height: "40px",
          maxWidth: "700px",
        },
      },
      "3": {
        small: {
          size: "18px",
          height: "23px",
          maxWidth: "367px",
        },
        medium: {
          size: "22px",
          height: "27px",
          maxWidth: "433px",
        },
        large: {
          size: "25px",
          height: "30px",
          maxWidth: "500px",
        },
        xlarge: {
          size: "28px",
          height: "33px",
          maxWidth: "567px",
        },
      },
      "4": {
        small: {
          size: "17px",
          height: "22px",
          maxWidth: "333px",
        },
        medium: {
          size: "18px",
          height: "23px",
          maxWidth: "367px",
        },
        large: {
          size: "20px",
          height: "25px",
          maxWidth: "400px",
        },
        xlarge: {
          size: "22px",
          height: "27px",
          maxWidth: "433px",
        },
      },
      "5": {
        small: {
          size: "14px",
          height: "19px",
          maxWidth: "283px",
        },
        medium: {
          size: "14px",
          height: "19px",
          maxWidth: "283px",
        },
        large: {
          size: "14px",
          height: "19px",
          maxWidth: "283px",
        },
        xlarge: {
          size: "14px",
          height: "19px",
          maxWidth: "283px",
        },
      },
      "6": {
        small: {
          size: "13px",
          height: "18px",
          maxWidth: "267px",
        },
        medium: {
          size: "13px",
          height: "18px",
          maxWidth: "267px",
        },
        large: {
          size: "13px",
          height: "18px",
          maxWidth: "267px",
        },
        xlarge: {
          size: "13px",
          height: "18px",
          maxWidth: "267px",
        },
      },
    },
  },
  paragraph: {
    small: {
      size: "14px",
      height: "19px",
      maxWidth: "283px",
    },
    medium: {
      size: "15px",
      height: "20px",
      maxWidth: "300px",
    },
    large: {
      size: "17px",
      height: "22px",
      maxWidth: "333px",
    },
    xlarge: {
      size: "18px",
      height: "23px",
      maxWidth: "367px",
    },
    xxlarge: {
      size: "22px",
      height: "27px",
      maxWidth: "433px",
    },
  },
  text: {
    xxsmall: {
      size: "11px",
      height: "16px",
      maxWidth: "280px",
    },
    xsmall: {
      size: "13px",
      height: "18px",
      maxWidth: "267px",
    },
    small: {
      size: "14px",
      height: "19px",
      maxWidth: "283px",
    },
    medium: {
      size: "15px",
      height: "20px",
      maxWidth: "300px",
    },
    large: {
      size: "17px",
      height: "22px",
      maxWidth: "333px",
    },
    xlarge: {
      size: "18px",
      height: "23px",
      maxWidth: "367px",
    },
    xxlarge: {
      size: "22px",
      height: "27px",
      maxWidth: "433px",
    },
  },
};
