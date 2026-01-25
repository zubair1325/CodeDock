import fs from "fs/promises";
import path from "path";
import wrapAsync from "../utils/wrapAsync.js";

export default async function (filePath) {
  const repoPath = path.resolve(process.cwd(), ".codeDock");
  const stagingPath = path.join(repoPath, "staging");
  try {
    await fs.mkdir(stagingPath, { recursive: true });
    const fileName = path.basename(filePath);
    await fs.copyFile(filePath, path.join(stagingPath, fileName));
    console.log(`File ${fileName} added to the staging area successfully!`);
  } catch (error) {
    console.log("Error adding files:", error);
  }
}
