const S3 = require('aws-sdk/clients/s3');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });

const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_BUCKET_REGION,
});

const uploadFile = (file) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: file.originalname,
    Body: file.buffer,
  };

  return s3.upload(params).promise();
};

module.exports = {
  upload,
  uploadFile,
};
