var createS3Policy = require("../../lib/aws/createS3Policy");
var crypto = require('crypto');

exports.get = function* () {
  const data = this.request.query
  const bucket = data.bucket // yuanyuanofficial
  const filename = data.filename
  const region = data.region // us-east-1
  const folder = data.folder // 'article_images/'
  const expiration = data.expiration //"2017-09-14T12:00:00.000Z"
  const date = data.date //20170901
  const key = folder + crypto.createHash('md5').update(filename + new Date().toISOString() + crypto.randomBytes(64).toString('hex')).digest("hex")
  const PolicyAndSecret = createS3Policy(bucket, region, folder, expiration, date)

  if (PolicyAndSecret["Policy"] && PolicyAndSecret["X-Amz-Signature"]) {
    this.status = 200
    this.body = {
      success: true,
      "Policy": PolicyAndSecret["Policy"],
      "X-Amz-Signature": PolicyAndSecret["X-Amz-Signature"],
      key: key
    }
  } else {
    this.status = 500
    this.body = {
      success: false
    }
  }
};
