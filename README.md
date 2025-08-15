# 🧚 Git Fairy

> Source control tells you what happened.  
> Git Fairy tells you the *story*.

Git Fairy transforms your `git log` into a whimsical diary of your code's journey.

---

## 🚀 Install (once published)
```bash
npm install -g git-fairy
```

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

### Options
```
--limit <n>       Limit number of commits (integer > 0)
--markdown        Output markdown section per commit
--style <name>    Story style: fairy (default), compact, markdown, json
--json            Shortcut for --style json (machine readable)
--no-color        Reserved for future color disabling
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
