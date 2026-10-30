const fs = require("fs");
const path = require("path");

const reportsDirectory = path.resolve("reports");
fs.mkdirSync(reportsDirectory, { recursive: true });

for (const entry of fs.readdirSync(reportsDirectory)) {
  if (entry !== ".gitkeep") {
    fs.rmSync(path.join(reportsDirectory, entry), {
      recursive: true,
      force: true,
    });
  }
}

console.log("Reports cleaned.");
