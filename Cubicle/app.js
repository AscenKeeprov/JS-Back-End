const express = require('express');
global.app = express();
app.root = process.cwd();

const coreDir = `${app.root}/core`;
const processManager = require('child_process');
const settings = require(`${coreDir}/settings.js`);

require(`${coreDir}/database.js`)(settings).then(() => {
	require(`${coreDir}/viewEngine.js`);

	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use(express.static(`${app.root}/static`));
	app.use(require(`${coreDir}/session.js`));
	app.use(require(`${coreDir}/router.js`));

	app.listen(settings.url.port, settings.url.hostname, function () {
		console.log(`Listening on port ${this.address().port}\r\n`);
		switch (process.platform) {
			case 'darwin':
				processManager.exec(`open ${settings.url.href}`);
				break;
			case 'linux':
				processManager.exec(`xdg-open ${settings.url.href}`);
				break;
			case 'win32':
				processManager.exec(`start ${settings.url.href}`);
				break;
		}
	});
});

module.exports = app;
