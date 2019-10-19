const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	password: {
		required: true,
		type: String
	},
	username: {
		maxLength: 64,
		minLength: 3,
		required: true,
		type: String,
		unique: true
	}
});

module.exports = mongoose.model('User', userSchema);
