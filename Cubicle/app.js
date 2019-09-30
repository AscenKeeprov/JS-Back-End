const express = require('express');
global.app = express();
app.root = process.cwd();

const config = require(`${app.root}/core/config.js`);
const database = require(`${app.root}/core/database.js`)(config);
const processManager = require('child_process');
const router = require(`${app.root}/core/router.js`);

require(`${app.root}/core/viewEngine.js`);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${app.root}/static`));
app.use(router);

const server = app.listen(config.url.port, config.url.hostname, function () {
	console.log(`Listening on port ${server.port}`)
});

switch (process.platform) {
	case 'darwin':
		processManager.exec(`open ${config.url.href}`);
		break;
	case 'linux':
		processManager.exec(`xdg-open ${config.url.href}`);
		break;
	case 'win32':
		processManager.exec(`start ${config.url.href}`);
		break;
}

module.exports = app;
