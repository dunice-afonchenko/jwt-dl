var jwt = require('jwt-dl');

var encodedJSON = jwt.getDecodedJsonByPath(expandHomeDir('~/Work/out.json'));

console.log(encodedJSON);