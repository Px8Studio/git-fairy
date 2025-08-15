// Import Jest globals if running outside Jest's automatic environment
const { test, expect } = require('@jest/globals');
const { spawnSync } = require('child_process');
const path = require('path');

test('CLI runs and prints help', () => {
  const cli = path.resolve(__dirname, '../../bin/git-fairy.js');
  const result = spawnSync('node', [cli, '--help'], { encoding: 'utf8' });
  expect(result.status).toBe(0);
  expect(result.stdout).toMatch(/usage|help/i);
});