export function sanitizeText(text) {
  const regex = /^(\w|\/|!|-|\.|\*|'|\(|\)| |&|\$|@|=|;|:|\+|,|\?)*$/;
  const normalizedText = text
    .normalize("NFD")
    .replaceAll("-", " ")
    .replace(/\d/g, "")
    .trim();
  const removedSpecialCharsText = normalizedText
    .split("")
    .filter((char) => regex.test(char))
    .join("");
  return removedSpecialCharsText;
}
