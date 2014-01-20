var Uploader = require('s3-streaming-upload').Uploader;

module.exports = function (id, stream) {
  return function (fn) {
    var upload = new Uploader({
      accessKey: process.env.AWS_ACCESS_KEY_ID,
      secretKey: process.env.AWS_SECRET_ACCESS_KEY,
      bucket: process.env.AWS_S3_BUCKET,
      region: process.env.AWS_REGION,
      objectName: id,
      objectParams: {
        ContentType: stream.mimeType
      },
      stream: stream
    });

    upload.on('completed', fn);
    upload.on('failed', fn);
  };
};
