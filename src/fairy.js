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
      case '--since':
        if (!args[i + 1]) throw new Error('Missing value for --since');
        opts.since = args[++i];
        break;
      case '--until':
        if (!args[i + 1]) throw new Error('Missing value for --until');
        opts.until = args[++i];
        break;
      case '--author':
        if (!args[i + 1]) throw new Error('Missing value for --author');
        opts.author = args[++i];
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
  return `Git Fairy 🧚\n\nUsage: git fairy [options]\n\nOptions:\n  --limit <n>        Limit number of commits (integer > 0)\n  --markdown         Output in markdown (equivalent to --style markdown)\n  --style <name>     Story style: fairy (default), compact, markdown, json\n  --json             Shorthand for --style json (machine readable)\n  --no-color         Disable color output\n  --since <date>     Only commits after date (git accepted format)\n  --until <date>     Only commits before date\n  --author <pattern> Filter by author (substring / regex)\n  -v, --version      Print version\n  -h, --help         Show help\n\nExamples:\n  git fairy --limit 20\n  git fairy --style compact\n  git fairy --markdown\n  git fairy --json > story.json\n  git fairy --since '2025-01-01' --author alice\n`;
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
  const config = loadConfig();
  const effective = { ...config.defaults, ...opts };
  const commits = getCommits(effective.limit, effective);
  if (!commits.length) {
    console.log('🧚 No commits yet – nothing to narrate. Make some magic with `git commit`!');
    return;
  }
  const story = narrate(commits, effective);
  console.log(story);
}

function loadConfig() {
  const cwd = process.cwd();
  const candidates = [
    path.join(cwd, '.git-fairy.json'),
    path.join(cwd, '.git-fairy.js'),
    path.join(cwd, 'package.json')
  ];
  for (const file of candidates) {
    if (!fs.existsSync(file)) continue;
    try {
      if (file.endsWith('.json')) {
        const data = JSON.parse(fs.readFileSync(file, 'utf8'));
        if (file.endsWith('package.json')) {
          if (data.gitFairy) return normalizeConfig(data.gitFairy);
        } else {
          return normalizeConfig(data);
        }
      } else if (file.endsWith('.js')) {
        // dynamic require for optional config
        const loaded = require(file);
        return normalizeConfig(loaded);
      }
    } catch {
      // ignore malformed
    }
  }
  return { defaults: {} };
}

function normalizeConfig(cfg) {
  if (!cfg || typeof cfg !== 'object') return { defaults: {} };
  return { defaults: cfg.defaults || {} };
}

module.exports = { run, parseArgs, getVersion, loadConfig };
