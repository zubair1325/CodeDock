import "dotenv/config";
import { S3Client } from "@aws-sdk/client-s3";

const client = new S3Client({
  forcePathStyle: true,
  region: process.env.SUPABASE_REGION,
  endpoint: process.env.SUPABASE_END_POINT,
  credentials: {
    accessKeyId: process.env.SUPABASE_ACCESS_KEY_ID,
    secretAccessKey: process.env.SUPABASE_SECRET_ACCESS_KEY,
  },
});

export  {client};
