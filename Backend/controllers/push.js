import fs from "fs/promises";
import path from "path";

export default async function () {
  const repoPath = path.resolve(process.cwd(), ".codeDock");
  const commitPath = path.join(repoPath, "commits");

  try {
    const commitsDir = await fs.readdir(commitPath);
    for (const commitDir of commitsDir) {
      const commitsToBe = path.join(commitPath, commitDir);
      const files = await fs.readdir(commitsToBe);
      for (const file of files) {
        const filePath = path.join(commitsToBe, file);
        const fileContent = await fs.readFile(filePath);
        ///upload to cloud
      }
    }
    console.log("All commits are pushed");
  } catch (error) {
    console.log("Error while pushing", error);
  }
}
