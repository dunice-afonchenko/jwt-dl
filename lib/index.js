var jwt = require('jwt-simple');
var path = require('path');
var fs = require('fs');
var expandHomeDir = require('expand-home-dir');


var p = expandHomeDir('~/.ssh/id_rsa');
var secret = fs.readFileSync(p, 'utf8');

if (!secret) {
	console.error('Error: could not open ~/.ssh/id_rsa');
}

module.exports = {
	encode: function(json) {
		return jwt.encode(json, secret);
	},
	decode: function(content) {
		return jwt.decode(content, secret);
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