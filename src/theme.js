import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

const darkBackgroundImage = "url('./images/adrienolichon_unsplash.png')";
const lightBackgroundImage = "url('./images/adrienolichon_unsplash.png')";
// color design  
export const colors = (mode) => ({
    ...(mode === "dark"
    ? {
// dark mode

grey: {
    100: "#e0e0e0",
    200: "#c2c2c2",
    300: "#a3a3a3",
    400: "#858585",
    500: "#666666",
    600: "#525252",
    700: "#3d3d3d",
    800: "#292929",
    900: "#141414"
}, // dark theme surface--dark grey
lightPurple: {
    100: "#f1e7fe",
    200: "#e4cffe",
    300: "#d6b6fd",
    400: "#c99efd",
    500: "#bb86fc",
    600: "#966bca",
    700: "#705097",
    800: "#4b3665",
    900: "#251b32"
}, // primary light purple
blueAccent:    
  {
     100: "#ccccff",
     200: "#9999ff",
     300: "#6666ff",
     400: "#3333ff",
     500: "#0000ff",
     600: "#0000cc",
     700: "#000099",
     800: "#000066",
     900: "#000033"
},
 // primary blue accent
pinkAccent: {
     
        100: "#ffccff",
        200: "#ff99ff",
        300: "#ff66ff",
        400: "#ff33ff",
        500: "#ff00ff",
        600: "#cc00cc",
        700: "#990099",
        800: "#660066",
        900: "#330033"
},
// pink accent
redAccent: {
    100: "#f5e0e4",
    200: "#ecc2c9",
    300: "#e2a3af",
    400: "#d98594",
    500: "#cf6679",
    600: "#a65261",
    700: "#7c3d49",
    800: "#532930",
    900: "#291418"
},// Error
components: {
    MuiCssBaseline: {
        styleOverrides: (theme) => ({
            custom: {
                backgroundImage: theme.palette.mode === 'dark' ? darkBackgroundImage : lightBackgroundImage,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center',
              },
            }),
        },
    },

// light mode
} : {
    grey: {
        100: "#141414",
        200: "#292929",
        300: "#3d3d3d",
        400: "#525252",
        500: "#666666",
        600: "#858585",
        700: "#a3a3a3",
        800: "#c2c2c2",
        900: "#e0e0e0",
    }, // dark theme surface--dark grey
    lightPurple: {
        100: "#251b32",
        200: "#4b3665",
        300: "#705097",
        400: "#966bca",
        500: "#bb86fc",
        600: "#c99efd",
        700: "#d6b6fd",
        800: "#e4cffe",
        900: "#f1e7fe",
    }, // primary light purple
    blueAccent:    
  {
     100: "#000033",
     200: "#000066",
     300: "#000099",
     400: "#0000cc",
     500: "#0000ff",
     600: "#3333ff",
     700: "#6666ff",
     800: "#9999ff",
     900: "#ccccff"
},
pinkAccent: {
    100: "#330033",
    200: "#660066",
    300: "#990099",
    400: "#cc00cc",
    500: "#ff00ff",
    600: "#ff33ff",
    700: "#ff66ff",
    800: "#ff99ff",
    900: "#ffccff" 
},
    redAccent: {
        100: "#291418",
        200: "#532930",
        300: "#7c3d49",
        400: "#a65261",
        500: "#cf6679",
        600: "#d98594",
        700: "#e2a3af",
        800: "#ecc2c9",
        900: "#f5e0e4",
    }, // Error
    components: {
        MuiCssBaseline: {
            styleOverrides: (theme) => ({
                custom: {
                    backgroundImage: theme.palette.mode === 'light' ? lightBackgroundImage : darkBackgroundImage,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center center',
                },
            }),
        },
    },
}),
});

// mui theme settings
export const themeSettings = (mode) => {
    const theme = colors(mode);

    return {
        palette: {
            mode: mode,
            ...(mode === 'dark' 
            ? {
                // dark mode
                primary: {
                    main: theme.lightPurple[500],
                },
                secondary: {
                    main: theme.blueAccent[500],
                },
                neutral: {
                    dark: theme.grey[900],
                    main: theme.grey[700],
                    light: theme.grey[100]
                },
                background: {
                    default: theme.grey[800],
                }
             } : {
                // light mode
                primary: {
                    main: theme.lightPurple[100],
                },
                secondary: {
                    main: theme.blueAccent[500],
                },
                neutral: {
                    dark: theme.grey[700],
                    main: theme.grey[500],
                    light: theme.grey[100]
                },
                background: {
                    default: "#fcfcfc",
                     },
                }),
            },
            typography: {
                fontFamily: ["Lato", "sans-serif"].join(","),
                fontSize: 12,
                h1: {
                    fontFamily: ["Lato", "sans-serif"].join(","),
                    fontSize: 40,
                },
                h2: {
                    fontFamily: ["Lato", "sans-serif"].join(","),
                    fontSize: 32,
                },
                h3: {
                    fontFamily: ["Lato", "sans-serif"].join(","),
                    fontSize: 24,
                },
                h4: {
                    fontFamily: ["Lato", "sans-serif"].join(","),
                    fontSize: 20,
                },
                h5: {
                    fontFamily: ["Lato", "sans-serif"].join(","),
                    fontSize: 16,
                },
                h6: {
                    fontFamily: ["Lato", "sans-serif"].join(","),
                    fontSize: 14,
                },

            },
        };
    };

  

// context for color mode
export const ColorModeContext = createContext({
    toggleColorMode: () => {}
});

export const useMode = () => {
    const [mode, setMode] = useState("dark");

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () =>
                setMode((prev) => (prev === "light" ? "dark" : "light")),
        }),
        []
    );

    const appTheme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

    return [appTheme, colorMode];
};
