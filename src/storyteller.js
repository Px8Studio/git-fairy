const chalk = require('chalk');
const moods = require('./moods.json');

function getMood(message) {
  const lower = message.toLowerCase();
  for (const key of Object.keys(moods)) {
    if (key === 'default') continue;
    if (lower.includes(key)) return moods[key];
  }
  return moods.default;
}

function formatFairy(c, color) {
  const mood = getMood(c.message);
  const fairy = color ? chalk.magenta('🧚') : '🧚';
  return `${fairy} ${c.date} – ${mood}\n${c.message}`;
}

function formatCompact(c) {
  return `${c.date} ${getMood(c.message)} ${c.message}`;
}

function formatMarkdown(c) {
  return `### ${c.date} – ${getMood(c.message)}\n\n${c.message}`;
}

function narrate(commits, opts = {}) {
  const style = (opts.style || 'fairy').toLowerCase();
  if (style === 'json') {
    return JSON.stringify(
      commits.map(c => ({ ...c, mood: getMood(c.message) })),
      null,
      2
    );
  }
  const color = !opts.noColor && process.stdout.isTTY;
  const formatter = {
    fairy: (c) => formatFairy(c, color),
    compact: formatCompact,
    markdown: formatMarkdown
  }[style] || ((c) => formatFairy(c, color));
  const joiner = style === 'compact' ? '\n' : '\n\n';
  return commits.map(formatter).join(joiner);
}

module.exports = { narrate, getMood };
