export function sanitizeText(text) {
  const normalizedText = text.normalize("NFD").replaceAll("-", " ");
  const removedAccentsText = normalizedText.replace(/[\u0300-\u036f]/g, "");
  return removedAccentsText;
}
