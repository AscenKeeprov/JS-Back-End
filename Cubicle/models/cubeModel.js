const mongoose = require('mongoose');

const cubeSchema = new mongoose.Schema({
	accessories: [{
		ref: 'Accessory',
		type: mongoose.Schema.Types.ObjectId
	}],
	creatorId: {
		required: true,
		type: mongoose.Schema.Types.String
	},
	description: {
		maxLength: 512,
		required: true,
		type: mongoose.Schema.Types.String
	},
	difficulty: {
		min: 1,
		required: true,
		type: mongoose.Schema.Types.Number
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
		type: mongoose.Schema.Types.String,
		unique: true
	}
});

cubeSchema.methods.toString = function () {
	return `${this.name} [${this.difficulty}]`;
};

module.exports = mongoose.model('Cube', cubeSchema);
