import fs from "fs";
import path from "path";
import { promisify } from "util";

const readdir = promisify(fs.readdir);
const copyFile = promisify(fs.copyFile);

export default async function (commitId) {
  const repoPath = path.resolve(process.cwd(), ".codeDock");
  const commitsPath = path.join(repoPath, "commits");

  try {
    const commitDir = path.join(commitsPath, commitId);
    const files = await readdir(commitDir);
    const parentDir = path.resolve(repoPath, "..");
    for (const file of files) {
      await copyFile(path.join(commitDir, file), path.join(parentDir, file));
      console.log(`Commit ${commitId} reverted successfully`);
    }
  } catch (error) {
    console.log("Error occurred while revert", error);
  }
}
