const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Simple bit-shift inspired poetic validator
function bitShiftScore(text) {
  let score = 0;
  for (let i = 0; i < text.length; i++) {
    score ^= text.charCodeAt(i) << (i % 5);
  }
  return (score % 100) / 100; // Normalize between 0–1
}

app.post('/validate-kairolynth', (req, res) => {
  const { kindness, wish, truth } = req.body;

  const kindnessScore = bitShiftScore(kindness || '');
  const wishScore = bitShiftScore(wish || '');
  const truthScore = bitShiftScore(truth || '');

  const isValid =
    kindness && kindness.length > 5 &&
    wish && wish.toLowerCase().startsWith('i hope') &&
    truth && truth.length > 5;

  res.json({
    valid: isValid,
    message: isValid
      ? "This is a true kairolynth. Bless it, speak it, let it fly."
      : "This doesn't feel like a full kairolynth yet. Try adding a real kindness or softening your truth.",
    score: {
      kindness: kindnessScore.toFixed(2),
      wish: wishScore.toFixed(2),
      truth: truthScore.toFixed(2)
    }
  });
});

app.listen(PORT, () => {
  console.log(`🌱 Kairolynth API listening on port ${PORT}`);
});
