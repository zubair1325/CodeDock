import fs from "fs/promises";
import path from "path";
import wrapAsync from "../utils/wrapAsync.js";

export default async function () {
  const repoPath = path.resolve(process.cwd(), ".codeDock");
  const commitsPush = path.join(repoPath, "commits");
  try {
    await fs.mkdir(repoPath, { recursive: true });
    await fs.mkdir(commitsPush, { recursive: true });
    await fs.writeFile(
      path.join(repoPath, "config.json"),
      JSON.stringify({ bucket: process.env.S3_BUCKET }),
    );
    console.log("repository initialized");
  } catch (error) {
    console.log("Error init files:", error);
  }
}
