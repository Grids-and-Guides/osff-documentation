import fs from "fs";
import semver from "semver";
import { execa } from "execa";

const releaseType = process.argv[2]; // patch | minor | major

if (!["patch", "minor", "major"].includes(releaseType)) {
  console.error("❌ Usage: pnpm release <patch|minor|major>");
  process.exit(1);
}

// Read package.json
const pkgPath = new URL("../package.json", import.meta.url);
const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));

const currentVersion = pkg.version;
const nextVersion = semver.inc(currentVersion, releaseType);

if (!nextVersion) {
  throw new Error("Failed to calculate next version");
}

console.log(`🚀 Releasing ${currentVersion} → ${nextVersion}`);

// Update version
pkg.version = nextVersion;
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");

// Run checks
await execa("pnpm", ["type"], { stdio: "inherit" });
await execa("pnpm", ["build"], { stdio: "inherit" });

// Commit & tag
await execa("git", ["add", "package.json"]);
await execa("git", ["commit", "-m", `chore(release): v${nextVersion}`]);
await execa("git", ["tag", `v${nextVersion}`]);

console.log(`✅ Version bumped to v${nextVersion}`);
