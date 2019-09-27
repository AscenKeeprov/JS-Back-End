global.appRoot = process.cwd();

const bodyParser = require('body-parser');
const config = require(`${appRoot}/core/config.js`);
const express = require('express');
const processManager = require('child_process');
const router = require(`${appRoot}/core/router.js`);

const app = express();

require(`${appRoot}/core/viewEngine.js`)(app);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(`${appRoot}/static`));
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
