global.appRoot = process.cwd();

const env = process.env.NODE_ENV || 'development';
const express = require('express');
const fs = require('fs');
const config = require(`${appRoot}/core/config.js`)[env];
const processManager = require('child_process');

const app = express();

require(`${appRoot}/core/routes.js`)(app);

app.use(function (req, res, next) {
	fs.readFile(`${appRoot}/views/404.hbs`, (err, data) => {
		if (err) next(err);
		else res.status(404).send(data.toString());
	});
})

app.use(function (err, req, res, next) {
	console.error(err.stack)
	res.status(500).send('Internal Server Error');
});

app.listen(config.port, config.host, () => {
	console.log(`Listening on port ${config.port}`)
});

let appURL = `http://${config.host}:${config.port}`;
switch (process.platform) {
	case 'darwin':
		processManager.exec(`open ${appURL}`);
		break;
	case 'linux':
		processManager.exec(`xdg-open ${appURL}`);
		break;
	case 'win32':
		processManager.exec(`start ${appURL}`);
		break;
}

module.exports = app;
