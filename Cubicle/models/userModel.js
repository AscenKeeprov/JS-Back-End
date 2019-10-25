const crypto = require('crypto');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	password: {
		required: [true, 'Password is required!'],
		type: mongoose.Schema.Types.String,
		validate: [
			{
				validator: value => { return value.length >= 8; },
				message: () => 'Password must be at least 8 characters long!'
			},
			{
				validator: value => { return /^(?=.*[0-9])(?=.*[a-z])(.+)$/i.test(value); },
				message: () => 'Password must contain at least one letter and one digit!'
			}
		]
	},
	username: {
		required: [true, 'Username cannot be empty!'],
		type: mongoose.Schema.Types.String,
		unique: true,
		validate: [
			{
				validator: value => { return value.length >= 4; },
				message: () => 'Username must be at least 4 characters long!'
			},
			{
				validator: value => { return value.length <= 50; },
				message: () => 'Username cannot be longer than 50 characters!'
			},
			{
				validator: value => { return /^[0-9A-Za-z]+$/i.test(value); },
				message: () => 'Username may contain only letters and digits!'
			}
		]
	}
});

userSchema.methods.verifyPassword = function (password) {
	return new Promise((resolve, reject) => {
		let hash = crypto.createHash('sha256').update(password).digest('base64');
		resolve(hash == this.password.split(/==/)[1]);
	});
};

userSchema.pre('validate', function (next) {
	/* SANITIZATION */
	this.password = this.password.trim();
	this.username = this.username.trim().toLowerCase();
	next();
});

userSchema.post('validate', function (doc, next) {
	/* TRANSFORMATION */
	let hash = crypto.createHash('sha256').update(doc.password).digest('base64');
	let salt = crypto.randomBytes(16).toString('base64');
	doc.password = salt + hash;
	next();
});

userSchema.post('validate', function (err, doc, next) {
	/* ERROR PARSING */
	next();
});

userSchema.pre('save', function (next) {
	/* CUSTOM VALIDATION */
	User.findOne({ username: this.username }).then(existingUser => {
		if (existingUser) {
			let validationError = new mongoose.Error.ValidationError(this);
			let validatorError = new mongoose.Error.ValidatorError({
				message: `Username '${this.username}' is already taken!`,
				path: 'username',
				reason: 'duplicate',
				value: this.username
			});
			validatorError.kind = 'unique';
			validationError.addError(validatorError.path, validatorError);
			return next(validationError);
		}
		next();
	}).catch(next);
});

userSchema.post('save', function (doc) {
	/* NOTIFICATION PARSING */
});

module.exports = User = mongoose.model('User', userSchema);
