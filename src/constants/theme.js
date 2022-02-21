import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
    // base colors
    red: "#FF3F12", // orange-red
    blue: "#001a72",   // blue

    green: "#6dc82a",
    grey: "#1c1939",

    black: "#1E1F20",
    white: "#FFFFFF",

    darkBlue: "#1c1939",
    lightGray: "#979797",

    lightGrayBackground: "#f3f4f6",
    borderColor: "#979797",

    darkgrayBackGround: "#eeeeee",
    darkgray: "#404040",

    transparent: "transparent",
};

export const SIZES = {
    // global sizes
    base: 8,
    font: 14,
    radius: 30,
    padding: 10,
    padding2: 12,

    largetitle: 40,
    h1: 35,
    h2: 22,
    h3: 18,
    h4: 16,
    h5: 14,

    // app dimensions
    width,
    height
};

export const FONTS = {
    largetitle: { fontFamily: "DMSans-Bold", fontSize: SIZES.largetitle },
    h1: { fontFamily: "DMSans-Bold", fontSize: SIZES.h1 },
    h2: { fontFamily: "DMSans-Bold", fontSize: SIZES.h2 },
    h3: { fontFamily: "DMSans-Bold", fontSize: SIZES.h3 },
    h4: { fontFamily: "DMSans-Bold", fontSize: SIZES.h4 },
    h5: { fontFamily: "DMSans-Bold", fontSize: SIZES.h5 },
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;