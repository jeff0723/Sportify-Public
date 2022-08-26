require('dotenv').config({ path: `${__dirname}/../.env` });

module.exports = {
    s3: {
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        },
        region: process.env.AWS_REGION,
        params: {
            Bucket: process.env.AWS_BUCKET,
            ACL: 'public-read'
        },
    },
    app: {
        storageDir: 'tmp',
    },
};