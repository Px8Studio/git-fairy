const fs = require('fs');
const path = require('path');
const { getCommits } = require('./parser');
const { narrate } = require('./storyteller');

function parseArgs(argv) {
  const args = argv.slice(2);
  const opts = {};
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === '--limit' && args[i+1]) {
      opts.limit = parseInt(args[++i], 10);
    } else if (a === '--help' || a === '-h') {
      opts.help = true;
    } else if (a === '--markdown') {
      opts.markdown = true;
    } else if (a === '--style' && args[i+1]) {
      opts.style = args[++i];
    }
  }
  return opts;
}

function help() {
  return `Git Fairy 🧚\n\nUsage: git fairy [options]\n\nOptions:\n  --limit <n>      Limit number of commits\n  --markdown       (reserved) Output markdown style\n  --style <name>   (reserved) Storytelling style\n  -h, --help       Show help\n`;
}

function run() {
  if (!fs.existsSync(path.join(process.cwd(), '.git'))) {
    throw new Error('Not a git repository.');
  }
  const opts = parseArgs(process.argv);
  if (opts.help) {
    console.log(help());
    return;
  }
  const commits = getCommits(opts.limit);
  if (!commits.length) {
    console.log('🧚 No commits yet – nothing to narrate. Make some magic with `git commit`!');
    return;
  }
  const story = narrate(commits, opts);
  console.log(story);
}

module.exports = { run };
