const assert = require('assert');
const { narrate, getMood } = require('../src/storyteller');

describe('storyteller', () => {
  const commits = [
    { date: '2025-08-15', message: 'fix: a thing' },
    { date: '2025-08-16', message: 'add: new feature' }
  ];

  it('assigns moods', () => {
    assert.match(getMood('fix bug'), /Nervous/i);
  });

  it('renders fairy style by default', () => {
    const out = narrate(commits, { noColor: true });
    assert.ok(out.includes('🧚'));
  });

  it('renders compact style', () => {
    const out = narrate(commits, { style: 'compact' });
    assert.ok(!out.includes('\n\n'));
  });

  it('renders markdown style', () => {
    const out = narrate(commits, { style: 'markdown' });
    assert.ok(out.includes('### 2025-08-15'));
  });

  it('renders json style', () => {
    const out = narrate(commits, { style: 'json' });
    const parsed = JSON.parse(out);
    assert.strictEqual(parsed.length, 2);
    assert.ok(parsed[0].mood);
  });
});
