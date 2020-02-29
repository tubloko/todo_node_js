const crypto = require('crypto');

const md5 = (password) => crypto
    .createHash('md5')
    .update(password)
    .digest('base64');

const makePublicKey = (msg) => md5('mySuperPasswordKey' + msg);

const isMessageValid = (msg, publicKey) => makePublicKey(msg) === publicKey;

module.exports = {
    md5,
    makePublicKey,
    isMessageValid
};