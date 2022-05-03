const ConvertString20 = (string) => {
  if (string != null && string.length >= 20) {
    return string.substring(0, 20) + "...";
  } else return string;
};

const ConvertString40 = (string) => {
  if (string.length >= 40) {
    return string.substring(0, 55) + "...";
  } else return string;
};

export { ConvertString20, ConvertString40 };
