async function askGemini(prompt) {
    return `I understand your question:
  
  "${prompt}"
  
  Currently I'm running in demo mode, but I can help you with general campus-related queries.`;
  }
  
  module.exports = {
    askGemini,
  };