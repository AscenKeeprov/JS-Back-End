const auth = require(`${app.root}/core/auth.js`);
const querystring = require('querystring');
const User = db.model('User');
const validator = require('express-validator');

function loginGet(req, res, next) {
	if (res.locals.isAuthenticated === true) return res.redirect('/');
	res.render('users/login', { title: 'Login' });
}

function loginPost(req, res, next) {
	res.locals.title = 'Login';
	const { username, password } = req.body;
	User.findOne({ username }).then(user => {
		if (!user) return res.render('users/login', { error: `Account '${username}' does not exist` });
		user.verifyPassword(password).then(passwordsMatch => {
			if (!passwordsMatch) return res.render('users/login', { error: 'Invalid password!', username });
			req.session.auth = auth.signIn({ uid: user._id });
			res.redirect('/');
		}).catch(next);
	}).catch(next);
}

function logout(req, res, next) {
	let sessionCookie = req.session.cookie;
	req.session.destroy();
	res.clearCookie(`${app.get('name')}.session`, sessionCookie);
	res.redirect('/');
}

function registerGet(req, res, next) {
	if (res.locals.isAuthenticated === true) return res.redirect('/');
	res.render('users/register', { title: 'Register' });
}

function registerPost(req, res, next) {
	res.locals.title = 'Register';
	const { username, password } = req.body;
	const validationError = validator.validationResult(req);
	if (!validationError.isEmpty()) {
		let errors = validationError.errors.map(e => e.msg);
		return res.render('users/register', { errors, username });
	}
	User.create({ password, username }).then(user => {
		console.log(`New user registered: ${user.username}`);
		res.redirect('/users/login?' + querystring.stringify({ notification: 'Registration successful!' }));
	}).catch(exception => {
		switch (exception.name) {
			case 'MongoError':
				if (exception.code == 11000) {
					let key = Object.keys(exception.keyValue)[0];
					let value = Object.values(exception.keyValue)[0];
					return res.render('users/register', { error: `Duplicate ${key}: '${value}'` });
				}
			case 'ValidationError':
				let errors = Object.values(exception.errors).map(e => e.message);
				return res.render('users/register', { errors, username });
			default: next(exception);
		}
	});
}

module.exports = {
	loginGet,
	loginPost,
	logout,
	registerGet,
	registerPost,
};
