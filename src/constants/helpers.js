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
