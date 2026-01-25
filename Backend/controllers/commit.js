import { v4 as uuidv4 } from "uuid";


export default async function (message) {
  const repoPath = path.resolve(process.cwd(), ".codeDock");
  const stagingPath = path.join(repoPath, "staging");
  const commitPath = path.join(repoPath, "commits");

  try {
    const commitId = uuidv4();
    const commitDir = path.join(commitPath, commitId);
    await fs.mkdir(commitDir, { recursive: true });
    const files = await fs.readdir(stagingPath);
    for (const file of files) {
      await fs.copyFile(
        path.join(stagingPath, file),
        path.join(commitDir, file),
      );
    }

    await fs.writeFile(
      path.join(commitDir, "commit.json"),
      JSON.stringify({
        message,
        date: new Date().toLocaleString(),
      }),
    );
    console.log(`Commit ${commitId} created with message ${message}`);
  } catch (error) {
    console.log("Error committing files:", error);
  }
}
