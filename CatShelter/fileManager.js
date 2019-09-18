const encoding = 'utf8';
const fs = require('fs');

function readFile(filePath) {
	return fs.readFileSync(filePath, encoding);
}

function readFileAsync(filePath, callback) {
	fs.readFile(filePath, encoding, (err, data) => {
		if (err) console.error(err);
		callback(data);
	});
}

module.exports = { readFile, readFileAsync }
