## Contributing to Git Fairy

Thanks for sprinkling some magic on the project! ✨

### Quick Start
1. Fork the repo
2. `git clone` your fork & `cd git-fairy`
3. `npm install`
4. `npm link` (optional for global usage) 
5. Create a branch: `git switch -c feat/cool-idea`
6. Make changes + add/adjust tests
7. `npm test` (ensure green)
8. Commit using clear, conventional-ish messages (see below)
9. Open a Pull Request

### Commit Message Hints
Use verbs and let the Fairy infer moods: e.g.
```
fix: handle empty repo without crash
add: spanish translation
refactor: extract mood matcher
```

### Adding Moods
Edit `src/moods.json` – keys are substring matches (lowercased). Keep keys short; emoji + short description for value. Put `default` last.

### Story Styles (Future)
You can prepare by adding alternative exporters in `src/storyteller/` and wiring a flag (not yet implemented).

### Tests
Add focused tests under `test/`. Keep them fast. A single smoke test is fine for small additions.

### Coding Style
Plain Node.js (CommonJS). Avoid heavy deps. Keep files small and intentions obvious.

### Release Process
Maintainers will bump version + publish. Contributors just PR.

### Code of Conduct
Be kind. Assume good intent. No harassment.

Enjoy! 🧚
