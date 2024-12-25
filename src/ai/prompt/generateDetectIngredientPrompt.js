function generateDetectIngredientPrompt() {
  return `
Please carefully analyze the provided image. Identify all visible food or drink items in the image and respond as a single valid JSON array (without any additional comments or text):

["item1", "item2", "item3", ...]

Instructions:
- Include all visible food or drink items in the array.
- If there are clearly visible brand names (e.g., "Coca-Cola", "Fanta"), include them as they appear without breaking them down into components.
- Do not deviate from the format above. **Do not add any explanation, code block, or anything else.**
`;
}

module.exports = generateDetectIngredientPrompt;
  