const { execSync } = require("child_process");

function getCommits(limit) {
  try {
    const format = "%ad|%s";
    const dateOpt = "--date=short";
    const limitOpt = limit ? `-n ${Number(limit)}` : "";
    const cmd = `git log ${limitOpt} --pretty=format:'${format}' ${dateOpt}`.trim();
    const log = execSync(cmd, { encoding: "utf8", stdio: ['pipe','pipe','ignore'] });
    if (!log.trim()) return [];
    return log.trim().split("\n").map(line => {
      const [date, message] = line.split("|");
      return { date, message };
    });
  } catch (e) {
    // Handle empty repo (no commits yet) – different git versions/platforms
    const msg = e.message || '';
    if (
      /does not have any commits/i.test(msg) ||
      /your current branch '.*' does not have any commits/i.test(msg) ||
      e.status === 128 ||
      e.status === 255 // observed on Windows empty repo
    ) {
      return [];
    }
    throw e;
  }
}

module.exports = { getCommits };
