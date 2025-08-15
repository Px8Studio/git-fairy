const assert = require('assert');
const { spawnSync } = require('child_process');
const path = require('path');

describe('Git Fairy', function () {
  it('basic assertion works', function () {
    assert.strictEqual(true, true);
  });

  it('--version outputs semver', function () {
    const bin = path.join(__dirname, '..', 'bin', 'git-fairy.js');
    const res = spawnSync(process.execPath, [bin, '--version'], { encoding: 'utf8' });
    assert.strictEqual(res.status, 0);
    assert.match(res.stdout.trim(), /^\d+\.\d+\.\d+/);
  });

  it('unknown flag errors', function () {
    const bin = path.join(__dirname, '..', 'bin', 'git-fairy.js');
    const res = spawnSync(process.execPath, [bin, '--definitely-not-a-flag'], { encoding: 'utf8' });
    assert.notStrictEqual(res.status, 0);
    assert.match(res.stderr, /Unknown option/);
  });
});
