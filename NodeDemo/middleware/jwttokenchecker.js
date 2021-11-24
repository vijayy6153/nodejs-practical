const jwt = require('jsonwebtoken');
var constant = require('../config/web-config');
var uuid = require("uuid");
module.exports = {

    //Validate JWT token
    // validateToken: (req, res, next) => {
        validateToken: (req, authOrSecDef, token, callback) => {
        //Get token from Authorization header
        // let token = req.headers.authorization;
        let result;
        //Check if token passed 
        if (token) {

            //Check if bearer token passed
            if (token.startsWith('Bearer ')) {
                // Remove Bearer from string
                token = token.split(' ')[1]; // Bearer <token>
            }

            // Set token verification options
            const options = {
                expiresIn: constant.jwtInfo.expiresIn,
                issuer: constant.jwtInfo.issuer
            };
            try {
                // verify makes sure that the token hasn't expired and has been issued by us
                result = jwt.verify(token, constant.jwtInfo.key, options);
                // Let's pass back the decoded token to the request object
                req.decoded = result;
                // We call next to pass execution to the subsequent middleware
                return callback(null);
                //next();
            } catch (err) {
                var errResult = {};
                switch (err.name) {
                    case 'TokenExpiredError':
                        errResult = {
                            error: `Token is expired.`,
                            status: 401
                        };
                        callback(sendError('Token is expired.'));
                        //req.res.status(401).send(errResult);
                        //return callback(errResult)
                        break;
                    case 'JsonWebTokenError':
                        errResult = {
                            error: err.message,
                            status: 401
                        };
                        callback(sendError(err.message));
                        // req.res.status(401).send(errResult);
                        break;
                    default:
                        break;
                }
                // Throw an error just in case anything goes wrong with verification
            }
        } else {
            result = {
                error: `Authentication error. Token required.`,
                status: 401
            };
            callback(sendError('Authentication error. Token required.'));
            // req.res.status(401).send(result);
        }

        function sendError(originalError){
            return req.res.status(401).json({ status: 401, message: "Error: Access Denied", error:  originalError});
        }
    },

    
    //Sign new token and pass to response
    signToken: (payload) => {
        const options = { expiresIn: constant.jwtInfo.expiresIn, issuer: constant.jwtInfo.issuer };
        //Generate refresh_token and pass in token (INFO: store refresh token in DB.)
        let refresh_token = uuid.v4();
        payload.refresh_token = refresh_token;

        //generate token and return
        const token = jwt.sign(payload, constant.jwtInfo.key, options);
        return token;
    },

    //Refresh tokens
    refreshToken: (token) => {
        const options = {
            expiresIn: constant.jwtInfo.expiresIn,
            issuer: constant.jwtInfo.issuer
        };
        let payload = jwt.verify(token, constant.jwtInfo.key, options);
        delete payload.iat;
        delete payload.exp;
        delete payload.iss;
        delete payload.refresh_token;

        const newToken = module.exports.signToken(payload); //jwt.sign(payload, constant.jwtInfo.key, options);
        return newToken;
    }


};