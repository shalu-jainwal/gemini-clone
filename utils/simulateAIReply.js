export function simulateAIReply(userMessage, delay = 3000) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: `Gemini response to: ${userMessage}`,
        timestamp: Date.now(),
      });
    }, delay);
  });
}
