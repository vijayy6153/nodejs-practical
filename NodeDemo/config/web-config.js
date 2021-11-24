'use strict';

module.exports.awsSetting = {
    awsRegion: 'us-east-1',
    awsUserPoolId:  '',
    S3BucketName: '',
    S3BucketUrl: '',
    IamUserKey:'',
    IamUserSecre: ''
};


module.exports.emailSetting = {
    from: '',
};

module.exports.connectionString =  {
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'nodedemo',
  };

module.exports.jwtInfo = {
    expiresIn: '2d',
    key: 'NodeDemo',
    issuer: 'http://localhost:3009'
};