const fs = require("fs");
const path = require("path");

const skillsDir = path.join(__dirname, "../skills");
const outputDirs = [
  path.join(__dirname, "../public/.well-known/skills"),
  path.join(__dirname, "../public/.well-known/agent-skills"),
];

const skills = [];

function parseYamlValue(value, allLines, startIndex) {
  value = value.trim();
  if (value === ">-" || value === ">" || value === "|" || value === "|-") {
    const lines = [];
    let i = startIndex + 1;
    while (i < allLines.length) {
      const line = allLines[i];
      if (line.match(/^\S/) || line === "---") break;
      lines.push(line.trim());
      i++;
    }
    return lines.filter(Boolean).join(" ");
  }
  return value.replace(/^["']|["']$/g, "");
}

for (const skillName of fs.readdirSync(skillsDir)) {
  const skillPath = path.join(skillsDir, skillName);
  const skillMdPath = path.join(skillPath, "SKILL.md");

  if (!fs.existsSync(skillMdPath)) continue;

  const content = fs.readFileSync(skillMdPath, "utf8");
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) continue;

  const frontmatterLines = match[1].split("\n");
  let name = null;
  let description = null;

  for (let i = 0; i < frontmatterLines.length; i++) {
    const line = frontmatterLines[i];
    const nameMatch = line.match(/^name:\s*(.+)$/);
    const descMatch = line.match(/^description:\s*(.*)$/);

    if (nameMatch) name = nameMatch[1].trim();
    if (descMatch) description = parseYamlValue(descMatch[1], frontmatterLines, i);
  }

  if (!name || !description) continue;
  skills.push({ name, description });
}

for (const outputDir of outputDirs) {
  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(
    path.join(outputDir, "index.json"),
    JSON.stringify({ skills }, null, 2)
  );
}

console.log(`Generados ${skills.length} skills:`, skills.map(s => s.name));
