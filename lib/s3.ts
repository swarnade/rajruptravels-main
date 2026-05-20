import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";

const region = process.env.AWS_REGION;
const bucket = process.env.AWS_S3_BUCKET;
const publicBaseUrl =
  process.env.AWS_S3_PUBLIC_BASE_URL ||
  (bucket && region ? `https://${bucket}.s3.${region}.amazonaws.com` : "");

let client: S3Client | null = null;

function getS3Client() {
  if (!region || !bucket) {
    throw new Error("Missing AWS_REGION or AWS_S3_BUCKET environment variables.");
  }

  if (!client) {
    client = new S3Client({ region });
  }

  return client;
}

function sanitizeFileName(fileName: string) {
  return fileName.replace(/[^a-zA-Z0-9._-]/g, "-");
}

export async function uploadFileToS3(file: File, folder: string) {
  const s3 = getS3Client();
  const body = Buffer.from(await file.arrayBuffer());
  const safeName = sanitizeFileName(file.name || "upload");
  const key = `${folder}/${Date.now()}-${randomUUID()}-${safeName}`;

  await s3.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: body,
      ContentType: file.type || "application/octet-stream",
    })
  );

  if (!publicBaseUrl) {
    throw new Error("Missing AWS_S3_PUBLIC_BASE_URL or bucket region details.");
  }

  return `${publicBaseUrl.replace(/\/$/, "")}/${key}`;
}
