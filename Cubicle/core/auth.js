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
	let userId = undefined;
	const decoded = jwt.decode(token);
	if (decoded) userId = decoded.uid;
	return userId;
}

function signIn(data) {
	return jwt.sign(data, secret, { expiresIn: '10m' });
}

module.exports = {
	authenticate,
	getUserId,
	signIn
}
