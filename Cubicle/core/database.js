const mongoose = require('mongoose');

require(`${app.root}/schemaTypes`);
require(`${app.root}/models`);

module.exports = (config) => {
	return mongoose.connect(`mongodb://${config.url.hostname}`, {
		dbName: `${config.name}DB`,
		useCreateIndex: true,
		useFindAndModify: false,
		useNewUrlParser: true,
		useUnifiedTopology: true
	}).then((mongoDb) => {
		global.db = mongoDb;
		const { $dbName, port } = db.connection;
		const url = db.connection.client.s.url;
		console.log(`Database connection established [${url}:${port}/${$dbName}]`);
	}).catch(err => console.error(err));
};
