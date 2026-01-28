import fs from "fs/promises";
import path from "path";
import { ListObjectsV2Command, GetObjectCommand } from "@aws-sdk/client-s3";

import { client } from "../config/cloud-config.js";

export default async function () {
  const repoPath = path.resolve(process.cwd(), ".codeDock");
  const commitsLocalPath = path.join(repoPath, "commits");

  try {
    const listCommand = new ListObjectsV2Command({
      Bucket: "codedock",
      Prefix: "commits/",
    });

    const listResponse = await client.send(listCommand);

    if (!listResponse.Contents) {
      console.log("No commits found in bucket.");
      return;
    }
    for (const item of listResponse.Contents) {
      const s3Key = item.Key;
      if (s3Key.endsWith("/")) continue;
      const getCommand = new GetObjectCommand({
        Bucket: "codedock",
        Key: s3Key,
      });

      const fileResponse = await client.send(getCommand);
      const content = await fileResponse.Body.transformToByteArray();
      const localFilePath = path.join(repoPath, s3Key);
      const localFileDir = path.dirname(localFilePath);
      await fs.mkdir(localFileDir, { recursive: true });
      await fs.writeFile(localFilePath, content);
      console.log(`Pulled: ${s3Key}`);
    }
    console.log("All commits are pulled successfully");
  } catch (error) {
    console.error("Unable to pull:", error);
  }
}
