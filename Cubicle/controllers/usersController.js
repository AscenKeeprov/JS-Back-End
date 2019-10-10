const bcrypt = require('bcrypt');
const User = db.model('User');

function loginGet(req, res, next) {
	
}

function loginPost(req, res, next) {

}

function logout(req, res, next) {

}

function registerGet(req, res, next) {
	res.render('users/register', { title: 'Register' });
}

function registerPost(req, res, next) {
	const { username, password, rePassword } = req.body;
	let errors = [];
	if (password !== rePassword) errors.push('Passwords do not match!');
	Promise.all([
		User.findOne({ username }),
		bcrypt.hash(password, 8)
	]).then(([existingUser, passwordHash]) => {
		if (existingUser) errors.push(`Username ${username} is already taken!`);
		if (errors.length > 0) return res.render('users/register', { errors, title: 'Register' });
		User.create({ password: passwordHash, username }).then(user => {
			console.log(`New user registered: ${user.username}`);
			res.redirect('/');
		}).catch(exception => {
			errors = Object.values(exception.errors).map(e => `Invalid ${e.path}!`);
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
