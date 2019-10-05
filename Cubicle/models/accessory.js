const mongoose = require('mongoose');

const accessorySchema = mongoose.Schema({
	cubes: [{
		ref: 'Cube',
		type: mongoose.Schema.Types.ObjectId
	}],
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

accessorySchema.methods.toString = function () {
	return `${this.name} [${this.difficulty}]`;
};

module.exports = mongoose.model('Accessory', accessorySchema);
