async function askGemini(prompt) {
  return `🤖 Gemini Fallback Service

You asked:

"${prompt}"

This is a temporary AI fallback response.`;
}

module.exports = {
  askGemini,
};