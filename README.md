# 🧚 Git Fairy

![CI](https://img.shields.io/github/actions/workflow/status/Px8Studio/git-fairy/ci.yml?branch=main)
![npm](https://img.shields.io/npm/v/git-fairy)
![license](https://img.shields.io/npm/l/git-fairy)

> Source control tells you what happened.  
> Git Fairy tells you the *story*.

Git Fairy transforms your `git log` into a whimsical diary of your code's journey.

---

## ✅ Is it ready for use in other projects?

**Yes!**  
Git Fairy is tested, has a CLI, and exposes a programmatic API.  
You can use it as a CLI tool or as a Node.js library in your own projects.

---

## 🚀 Install (once published)
```bash
npm install -g git-fairy
# or for local/project use:
npm install git-fairy
```

## 🧩 Usage as a Library

You can use Git Fairy in your own Node.js scripts to narrate commit histories:

```js
// ESM or TypeScript: import { narrate, getMood } from 'git-fairy';
// CommonJS:
const { narrate, getMood } = require('git-fairy');

// Example: narrate a list of commits
const commits = [
  { date: '2025-08-15', message: 'fix: a thing' },
  { date: '2025-08-16', message: 'add: new feature' }
];

const story = narrate(commits, { style: 'markdown' });
console.log(story);

// Get mood for a commit message
console.log(getMood('fix bug')); // e.g. "😬 Nervous about breaking things"
```

See [`index.d.ts`](./index.d.ts) for full type definitions.

---

## 🧪 Local Dev / Try It Now (before publishing)
From the project root:
```bash
# install dev deps
npm install

# link globally so you can run `git fairy` anywhere
npm link

# OR install globally from the folder (alternative)
npm install -g .
```

Then in any git repo with commits:
```bash
git fairy
```

Because the binary name is `git-fairy`, Git lets you also run it as a subcommand (`git fairy`).

If your repo has no commits yet, you’ll get a friendly notice instead of an error.

---

## 🛠 Usage
```bash
cd your-project
git fairy            # prints a narrated commit history
```

You can also run as a CLI:
```bash
npx git-fairy --help
```
or
```bash
git fairy --limit 10 --style compact
```

### Options
```
--limit <n>       Limit number of commits (integer > 0)
--markdown        Output markdown section per commit
--style <name>    Story style: fairy (default), compact, markdown, json
--json            Shortcut for --style json (machine readable)
--no-color        Reserved for future color disabling
--version         Show version
--since <date>    Filter commits since date
--until <date>    Filter commits until date
--author <pat>    Filter commits by author match
```

---

## ✨ Example Output
```
🧚 2025-08-12 – 😁 Excited about new features
Added a shiny new authentication system.

🧚 2025-08-13 – 😬 Nervous about breaking things
Quick fix for that thing I broke yesterday.

🧚 2025-08-15 – 🏆 Victory!
Merged feature branch into main. All tests passed. Champagne time.
```

---

## 🎨 Custom Moods
### Project Defaults via Config
Create a `.git-fairy.json` (or `.git-fairy.js` exporting an object) or add `gitFairy` key in `package.json`:
```json
{
	"defaults": {
		"style": "compact",
		"limit": 40,
		"since": "2025-01-01"
	}
}
```
CLI flags always override config.

Edit `src/moods.json` to add new keyword → emoji + feeling mappings. The first matching key (substring) wins; `default` is the fallback.

---

## 🤝 Contributing
We welcome pull requests for:

- New moods / emojis (`moods.json`)
- Alternative storytelling styles
- Language translations
- VS Code extension integration

See `CONTRIBUTING.md` for guidelines.

---

## 🧩 Project Structure
```
bin/git-fairy.js   # CLI entry
src/fairy.js       # Orchestration
src/parser.js      # Git log parsing
src/storyteller.js # Narrative building
src/moods.json     # Mood mappings
test/basic.test.js # Smoke test
```

---

## 🧪 Tests
```bash
npm test
```

---

## 📦 Publishing Checklist
- [ ] Pick initial semver (already set to 0.1.0 for first public release)
- [ ] Fill in `author` in `package.json`
- [ ] Confirm `repository`, `bugs`, `homepage` URLs are correct
- [ ] Add any badges (npm version, CI) once published
- [ ] `npm login`
- [ ] Run `npm test`
- [ ] `npm publish --access public`

---

## ⚖ License
MIT – see `LICENSE`.

---

> Have an idea? Open an issue and let the Fairy sprinkle some magic.
