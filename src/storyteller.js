const moods = require('./moods.json');

function getMood(message) {
  const lower = message.toLowerCase();
  for (const key of Object.keys(moods)) {
    if (key === 'default') continue;
    if (lower.includes(key)) return moods[key];
  }
  return moods.default;
}

function narrate(commits /*, opts */) {
  return commits.map(c => `🧚 ${c.date} – ${getMood(c.message)}\n${c.message}`).join('\n\n');
}

module.exports = { narrate, getMood };
