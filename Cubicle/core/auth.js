const jwt = require('jsonwebtoken');
const secret = '53cr37';

function authenticate(req, res, next) {
	jwt.verify(req.session.auth, secret, function (err, decoded) {
		if (err) res.locals.isAuthenticated = false;
		if (decoded) res.locals.isAuthenticated = true;
	});
	next();
}

function getUserId(token) {
	const decoded = jwt.decode(token);
	if (decoded) return decoded.uid;
}

function signIn(payload) {
	return jwt.sign(payload, secret, { expiresIn: '10m' });
}

module.exports = {
	authenticate,
	getUserId,
	signIn
}
