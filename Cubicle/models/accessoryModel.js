const mongoose = require('mongoose');

const accessorySchema = new mongoose.Schema({
	cubes: [{
		ref: 'Cube',
		type: mongoose.Schema.Types.ObjectId
	}],
	description: {
		maxLength: 512,
		required: true,
		type: mongoose.Schema.Types.String
	},
	imageUrl: {
		maxLength: 2048,
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

module.exports = mongoose.model('Accessory', accessorySchema);
