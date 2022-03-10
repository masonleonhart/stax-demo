import { COLORS } from "./theme";

export const determineMatchType = (zscore) => {
  if (zscore <= -2) {
    return "Bad";
  } else if (zscore > -2 && zscore <= -1) {
    return "Poor";
  } else if (zscore > -1 && zscore < 1) {
    return "Average";
  } else if (zscore >= 1 && zscore < 2) {
    return "Good";
  } else if (zscore >= 2) {
    return "Excelent";
  }
};

export const determineColor = (zscore) => {
  if (zscore <= -2) {
    return COLORS.orange;
  } else if (zscore > -2 && zscore <= -1) {
    return COLORS.orange;
  } else if (zscore > -1 && zscore < 1) {
    return COLORS.yellow;
  } else if (zscore >= 1 && zscore < 2) {
    return COLORS.purple;
  } else if (zscore >= 2) {
    return COLORS.green;
  }
};
