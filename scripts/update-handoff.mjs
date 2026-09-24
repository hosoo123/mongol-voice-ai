import fs from "node:fs";
import { execFileSync } from "node:child_process";

function git(...args) {
  return execFileSync("git", args, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  }).trim();
}

const handoffPath = "AI_HANDOFF.md";

if (!fs.existsSync(handoffPath)) {
  console.error("❌ AI_HANDOFF.md олдсонгүй.");
  process.exit(1);
}

const now = new Date();
const timestamp = now.toLocaleString("mn-MN", {
  dateStyle: "short",
  timeStyle: "medium",
});

const branch = git("rev-parse", "--abbrev-ref", "HEAD");

const stagedFiles = git(
  "diff",
  "--cached",
  "--name-only"
)
  .split(/\r?\n/)
  .filter(Boolean)
  .filter((file) => file !== handoffPath);

const diffStat =
  git("diff", "--cached", "--stat") || "No staged changes.";

const workingTreeStatus =
  git("status", "--short") || "Clean";

const latestCommit =
  git("log", "-1", "--pretty=%h %s") || "No previous commit.";

const fileList =
  stagedFiles.length > 0
    ? stagedFiles.map((file) => `- \`${file}\``).join("\n")
    : "- No project files detected.";

const newLogEntry = `
### ${timestamp}

- Branch: \`${branch}\`
- Staged files:
${fileList}
- Latest previous commit: \`${latestCommit}\`

\`\`\`text
${diffStat}
\`\`\`
`;

let content = fs.readFileSync(handoffPath, "utf8");

// ===== Automated Change Log =====

const changeLogStart = "<!-- AUTO:CHANGELOG:START -->";
const changeLogEnd = "<!-- AUTO:CHANGELOG:END -->";

if (
  content.includes(changeLogStart) &&
  content.includes(changeLogEnd)
) {
  const startIndex =
    content.indexOf(changeLogStart) + changeLogStart.length;

  const endIndex = content.indexOf(changeLogEnd);

  const existingLog = content
    .slice(startIndex, endIndex)
    .trim();

  const combinedLog = `${newLogEntry.trim()}\n\n${existingLog}`.trim();

  content =
    content.slice(0, startIndex) +
    `\n\n${combinedLog}\n\n` +
    content.slice(endIndex);
} else {
  content += `

---

## 🤖 Automated Change Log

${changeLogStart}

${newLogEntry.trim()}

${changeLogEnd}
`;
}

// ===== Automated Current Status =====

const statusStart = "<!-- AUTO:STATUS:START -->";
const statusEnd = "<!-- AUTO:STATUS:END -->";

const statusBlock = `
## 🤖 Automated Project Snapshot

${statusStart}

- Updated: ${timestamp}
- Branch: \`${branch}\`
- Working tree before hook:

\`\`\`text
${workingTreeStatus}
\`\`\`

- Previous commit:

\`\`\`text
${latestCommit}
\`\`\`

${statusEnd}
`;

if (
  content.includes(statusStart) &&
  content.includes(statusEnd)
) {
  const startIndex =
    content.indexOf(statusStart) - 
    content.slice(0, content.indexOf(statusStart)).lastIndexOf("## 🤖 Automated Project Snapshot");

  const endIndex =
    content.indexOf(statusEnd) + statusEnd.length;

  content =
    content.slice(0, startIndex) +
    statusBlock.trim() +
    content.slice(endIndex);
} else {
  content += `\n\n${statusBlock.trim()}\n`;
}

fs.writeFileSync(handoffPath, content, "utf8");

console.log("✅ AI_HANDOFF.md автоматаар шинэчлэгдлээ.");