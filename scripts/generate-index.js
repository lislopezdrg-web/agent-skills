const fs = require("fs");
const path = require("path");

const skillsDir = path.join(__dirname, "../skills");
const outputDir = path.join(__dirname, "../public/.well-known/skills");

const skills = [];

for (const skillName of fs.readdirSync(skillsDir)) {
  const skillPath = path.join(skillsDir, skillName);
  const skillMdPath = path.join(skillPath, "SKILL.md");

  if (!fs.existsSync(skillMdPath)) continue;

  const content = fs.readFileSync(skillMdPath, "utf8");
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) continue;

  const name = match[1].match(/^name:\s*(.+)$/m)?.[1]?.trim();
  const description = match[1].match(/^description:\s*([\s\S]*?)(?=\n\w|$)/m)?.[1]
    ?.replace(/>\-\n\s+/g, "")
    ?.replace(/\n\s+/g, " ")
    ?.trim();

  if (!name || !description) continue;

  skills.push({ name, description });
}

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(
  path.join(outputDir, "index.json"),
  JSON.stringify({ skills }, null, 2)
);

console.log(`Generados ${skills.length} skills:`, skills.map(s => s.name));
