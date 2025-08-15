const fs = require('fs');
const path = require('path');
const { getCommits } = require('./parser');
const { narrate } = require('./storyteller');

function parseArgs(argv) {
  const args = argv.slice(2);
  const opts = {};
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    switch (a) {
      case '--limit':
        if (!args[i + 1]) throw new Error('Missing value for --limit');
        opts.limit = parseInt(args[++i], 10);
        if (Number.isNaN(opts.limit) || opts.limit < 1) throw new Error('Invalid --limit value');
        break;
      case '--help':
      case '-h':
        opts.help = true;
        break;
      case '--version':
      case '-v':
        opts.version = true;
        break;
      case '--markdown':
        opts.markdown = true;
        break;
      case '--style':
        if (!args[i + 1]) throw new Error('Missing value for --style');
        opts.style = args[++i];
        break;
      case '--json':
        opts.json = true;
        break;
      case '--no-color':
        opts.noColor = true;
        break;
      default:
        if (a.startsWith('-')) {
          throw new Error(`Unknown option: ${a}`);
        }
    }
  }
  return opts;
}

function help() {
  return `Git Fairy 🧚\n\nUsage: git fairy [options]\n\nOptions:\n  --limit <n>        Limit number of commits (integer > 0)\n  --markdown         Output in markdown (equivalent to --style markdown)\n  --style <name>     Story style: fairy (default), compact, markdown, json\n  --json             Shorthand for --style json (machine readable)\n  --no-color         Disable any color output (reserved for future)\n  -v, --version      Print version\n  -h, --help         Show help\n\nExamples:\n  git fairy --limit 20\n  git fairy --style compact\n  git fairy --markdown\n  git fairy --json > story.json\n`;
}

function getVersion() {
  try {
    return require('../package.json').version || '0.0.0';
  } catch {
    return '0.0.0';
  }
}

async function run() {
  const opts = parseArgs(process.argv);
  if (opts.help) {
    console.log(help());
    return;
  }
  if (opts.version) {
    console.log(getVersion());
    return;
  }
  if (!fs.existsSync(path.join(process.cwd(), '.git'))) {
    throw new Error('Not a git repository.');
  }
  if (opts.json) opts.style = 'json';
  if (opts.markdown && !opts.style) opts.style = 'markdown';
  const commits = getCommits(opts.limit);
  if (!commits.length) {
    console.log('🧚 No commits yet – nothing to narrate. Make some magic with `git commit`!');
    return;
  }
  const story = narrate(commits, opts);
  console.log(story);
}

module.exports = { run, parseArgs, getVersion };
