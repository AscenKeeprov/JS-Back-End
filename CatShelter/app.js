const express = require('express');
const fileManager = require('./fileManager.js');
const processManager = require('child_process');
const app = express();

let config = JSON.parse(fileManager.readFile('./config.json'));
const server = app.listen(config.port, () => {
	console.log(`Listening on port ${config.port}`);
});

let appURL = `http://localhost:${config.port}`;
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

app.get('/', (req, res) => res.sendFile(`${__dirname}/views/home/index.html`));
app.get('/exit', () => {
	console.log('Closing application...');
	server.close();
	process.exit(0);
});

app.use(express.static(__dirname));
