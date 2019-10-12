const bcrypt = require('bcrypt');
const querystring = require('querystring');
const User = db.model('User');

function loginGet(req, res, next) {
	res.render('users/login', { title: 'Login' });
}

function loginPost(req, res, next) {

}

function logout(req, res, next) {
	res.redirect('/');
}

function registerGet(req, res, next) {
	res.render('users/register', { title: 'Register' });
}

function registerPost(req, res, next) {
	res.locals.title = 'Register';
	const { username, password, rePassword } = req.body;
	if (password !== rePassword) return res.render('users/register', { error: 'Passwords do not match!' });
	Promise.all([
		User.findOne({ username }),
		bcrypt.hash(password, 8)
	]).then(([existingUser, passwordHash]) => {
		if (existingUser) return res.render('users/register', { error: `Username ${username} is already taken!` });
		User.create({ password: passwordHash, username }).then(user => {
			console.log(`New user registered: ${user.username}`);
			res.redirect('/users/login?' + querystring.stringify({ notification: 'Registration successful!' }));
		}).catch(exception => {
			let errors = Object.values(exception.errors).map(e => `Invalid ${e.path}!`);
			res.render('cubes/create', { errors, imageUrl, title: 'Add a cube', username });
		});
	}).catch(next);
}

module.exports = {
	loginGet,
	loginPost,
	logout,
	registerGet,
	registerPost,
};
