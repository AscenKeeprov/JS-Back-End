global.appRoot = process.cwd();

const app = require('express')();
const env = process.env.NODE_ENV || 'development';
const config = require(`${appRoot}/core/config.js`)[env];
const processManager = require('child_process');
const router = require(`${appRoot}/core/router.js`);

app.use(router);

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
