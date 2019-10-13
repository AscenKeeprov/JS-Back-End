const mongoose = require('mongoose');

const cubeSchema = mongoose.Schema({
	accessories: [{
		ref: 'Accessory',
		type: mongoose.Schema.Types.ObjectId
	}],
	creatorId: {
		required: true,
		type: String
	},
	description: {
		maxLength: 512,
		required: true,
		type: String
	},
	difficulty: {
		min: 1,
		required: true,
		type: Number
	},
	imageUrl: {
		maxLength: 2048,
		required: true,
		type: mongoose.Schema.Types.Url
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
