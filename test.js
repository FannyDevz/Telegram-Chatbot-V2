const { _ai } = require("lowline.ai");

async function generateText() {
  try {
    const res = await _ai.generatePlaintext({
      prompt: "Explain the rules of cricket in a way that a 5 year old can understand.",
    });
    
    if (res.error) {
      console.log(res.error);
    } else {
      console.log(res.result);
      // Cricket is a game that is played between two teams, with each team taking turns to bat and bowl.
      // The team that scores the most runs wins the game.
    }
  } catch (error) {
    console.error(error);
  }
}

generateText();
