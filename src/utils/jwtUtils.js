const jwt = require('jsonwebtoken');

module.exports.create = (data) => {
    try {
        if (validateAtributes(data)) {
            const payload = {
                data,
                exp: Math.floor(Date.now() / 1000) - 30
            };
            return jwt.sign(payload, process.env.JWT_SECRET_KEY);
        } else return "";
    } catch (err) {
        console.log(err);
        return err;
    }
}

const validateAtributes = (data) =>
    (data.id && data.id > 0) &&
    (data.mail && data.mail.length > 0);