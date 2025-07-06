const CapitalizeEachWord = (str: string): string => {
  return str
    .trim()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export default CapitalizeEachWord;
