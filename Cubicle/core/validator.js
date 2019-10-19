const validator = require('express-validator');

const messages = {
	password: 'Password must be at least 8 characters long and consist of English letters and digits!',
	username: 'Username must contain only English letters and digits and be 4 or more characters long!'
}

const patterns = {
	password: /^(?=.*[0-9])(?=.*[a-z])([0-9A-Za-z]{8,})$/i,
	username: /^[0-9A-Za-z]{4,}$/i
}

function parseErrors(req) {
	const result = validator.validationResult(req);
	if (!result.isEmpty()) return result.errors.map(e => e.msg);
	else return [];
}

module.exports = { messages, parseErrors, patterns, validate: validator.check }
