const aws = require('aws-sdk')
require('dotenv').config();



aws.config.region = 'us-west-2'; // Region

aws.config.credentials = new aws.Credentials(process.env.AWS_ACCESS_KEY, process.env.AWS_SECRET_KEY)

exports = module.exports = {
    sign: function(req, res, next) {
        var filename = req.body.filename
        var filetype = req.body.filetype
        var s3 = new aws.S3();
        var params = {
            Bucket: process.env.SOME_BUCKET,
            Key: filename,
            Expires: 60,
            ContentType: filetype
        };
        s3.getSignedUrl("putObject", params, function(err, data) {
            if (err) {
                console.log(err);
                return err;
            } else {
                res.status(200).send(data);
            }
        });
    }
};