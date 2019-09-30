const mongoose = require('mongoose');

module.exports = (config) => {
	mongoose.connect(`mongodb://${config.url.hostname}`, {
		dbName: `${config.name}DB`,
		useNewUrlParser: true,
		useUnifiedTopology: true
	}).catch(err => console.error(err));

	mongoose.connection.once('connected', (err) => {
		if (err) return console.error(err);
		console.log('MongoDB connection established');
	});
};
