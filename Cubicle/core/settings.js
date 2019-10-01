const url = require('url');

app.set('env', process.env.NODE_ENV || 'development');

switch (app.settings.env) {
	case 'development':
		app.set('url', url.parse(`http://localhost:${process.env.PORT || 8080}`));
		break;
	case 'production':
		app.set('url', url.parse(`http://127.0.0.1:${process.env.PORT || 80}`));
		break;
	default: throw new Error('Failed to load application configuration!');
}

app.set('name', process.env.npm_package_name
	? process.env.npm_package_name[0].toUpperCase() + process.env.npm_package_name.slice(1)
	: 'Cubicle');

module.exports = app.settings;
