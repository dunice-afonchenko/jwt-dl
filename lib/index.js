var path = require('path');
var fs = require('fs');
var crypto = require('crypto');
var expandHomeDir = require('expand-home-dir');

var p = expandHomeDir('~/.ssh/id_rsa');
var secret = fs.readFileSync(p, 'utf8');
var algorithm = 'aes-256-ctr'

if (!secret) {
    console.error('Error: could not open ~/.ssh/id_rsa');
}

module.exports = {
    encode: function(data) {
        var json = JSON.stringify(data);
        var cipher = crypto.createCipher(algorithm,secret);
        var crypted = cipher.update(json,'utf8','hex');
        crypted += cipher.final('hex');
        return crypted;
    },
    decode: function(content) {
        var decipher = crypto.createDecipher(algorithm,secret)
        var decrypted = decipher.update(content,'hex','utf8')
        decrypted += decipher.final('utf8');
        return JSON.parse(decrypted);
    },
    getDecodedJsonByPath: function(p) {
        var inFileContent = fs.readFileSync(p, 'utf8');
        if (!inFileContent) {
            console.error('Error: could not open inFile');
            return false;
        }
        try {
            return this.decode(inFileContent);
        } catch (e) {
            console.error('Error: could not parse json inFile', e.message);
            return false;
        }
    }
}