const mongoose = require('mongoose');

const cubeSchema = mongoose.Schema({
	description: {
		maxLength: 512,
		type: String
	},
	difficulty: {
		min: 1,
		required: true,
		type: Number
	},
	imageUrl: {
		maxLength: 2048,
		type: String
	},
	name: {
		maxLength: 64,
		minLength: 3,
		required: true,
		type: String,
		unique: true
	}
});

cubeSchema.methods.toString = function () {
	return `${this.name} [${this.difficulty}]`;
};

module.exports = mongoose.model('Cube', cubeSchema);
