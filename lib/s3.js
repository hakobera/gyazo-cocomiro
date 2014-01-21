var AWS = require('aws-sdk');
var thunkify = require('thunkify');

var s3 = new AWS.S3();
var getSignedUrl = thunkify(s3.getSignedUrl.bind(s3));

function params(id) {
  return {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: id
  };
}

module.exports = {
  getUrl: function (id) {
    return getSignedUrl('getObject', params(id));
  },

  exists: function (id) {
    return function (fn) {
      s3.headObject(params(id), function (err, response) {
        if (err) {
          if (err.statusCode && err.statusCode === 404) {
            return fn(null, false);
          } else {
            return fn(err);
          }
        }
        fn(null, true);
      });
    };
  }
};
