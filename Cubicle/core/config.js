const environment = process.env.NODE_ENV || 'development';

module.exports = {
	development: {
		host: 'localhost',
		port: process.env.PORT || 8080
	},
	production: {
		host: '127.0.0.1',
		port: process.env.PORT || 80
	}
}[environment];
