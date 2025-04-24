
const Promise = require('bluebird');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const chance = require('chance').Chance();

const s3 = new S3Client({
  region: process.env.AWS_RIGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  }
});

module.exports = async (payload) => {
  try {

    if (!payload) {
      throw new Error('Payload is required');
    }

    if (!payload.originBuffer) {
      throw new Error('originBuffer is required');
    }

    if (!payload.contentType) {
      throw new Error('contentType is required');
    }

    if (!payload.ext) {
      throw new Error('ext is required');
    }

    const bucketName = payload.bucketName ?? process.env.AWS_S3_BUCKET_NAME;
    const fileName = chance.string({ length: 20, casing: 'upper', alpha: true, numeric: true });
    const s3Path = payload.s3Path ?? 'NONE';
    const key = `${s3Path}/${fileName}.${payload.ext}`;

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: payload.originBuffer,
      ContentType: payload.contentType,
    });

    await s3.send(command);

    if (payload.filePath) {
      fs.unlinkSync(payload.filePath);
    }

    return {
      fileName: `${fileName}.${payload.ext}`,
      url: `https://${bucketName}.s3.${process.env.AWS_RIGION}.amazonaws.com/${key}`
    };
  } catch (err) {
    return Promise.reject(err);
  }
};