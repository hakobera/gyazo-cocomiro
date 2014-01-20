var AWS = require('aws-sdk');
var thunkify = require('thunkify');

var s3 = new AWS.S3();
var getSignedUrl = thunkify(s3.getSignedUrl.bind(s3));

exports.getUrl = function (id) {
  var params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: id
  };
  return getSignedUrl('getObject', params);
};
