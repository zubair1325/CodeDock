import fs from "fs/promises";
import path from "path";

export default async function () {
  const repoPath = path.resolve(process.cwd(), ".codeDock");
  const commitsPath = path.join(repoPath, "commits");
  try {
    //read data from cloud and download
  } catch (error) {
    console.log("Unable to pull", error);
  }
}
