#!/usr/bin/env node
// CLI entrypoint with basic error handling.
const { run } = require('../src/fairy');

(async () => {
	try {
		await run();
	} catch (err) {
		const msg = err && err.message ? err.message : String(err);
		console.error(`git-fairy error: ${msg}`);
		process.exitCode = 1;
	}
})();
