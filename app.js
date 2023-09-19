const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const fs = require("fs");
const dotEnv = require('dotenv')
dotEnv.config()

const s3Client = new S3Client({
  region: process.env.REGION,
  endpoint: process.env.ENDPOINT,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRECT_KEY
  },
});

const uploadFile = async () => {
  try {
    const fileContent = fs.readFileSync("specifier.png");
    const object = new PutObjectCommand({
      Bucket: process.env.BUCKET,
      Key: "specifier.png",
      Body: fileContent,
    });

    await s3Client.send(object);
  } catch (error) {
    console.log(error);
  }
};

uploadFile();
