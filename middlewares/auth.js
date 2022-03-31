const jwt = require('jsonwebtoken');
var privateKey = 'nais';

const verify = async (req, res, next) => {
    const token = req.headers["auth"]
    jwt.verify(token, privateKey, (err, decoded) => {
        console.log("error", err)
        if (err) {
            return res.status(401).send({
                err: err
            })
        }
        req.id = decoded.id;
        next();
    });
}

const generateToken = (payload) => {
    return jwt.sign(payload, privateKey, {
        algorithm: 'HS256',
        expiresIn: "1h"
    });
}

module.exports = {
    verify,
    generateToken
}
