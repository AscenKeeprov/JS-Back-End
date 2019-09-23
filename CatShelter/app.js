global.appRoot = process.cwd();

const config = require(`${appRoot}/config.json`);
const handlers = require(`${appRoot}/handlers/handlers.js`)
const http = require('http');
const processManager = require('child_process');

const server = http.createServer((request, response) => {
	request.data = '';
	request.on('data', (data) => {
		if (request.data.length > 1e6) {
			response.writeHead(413, { 'Content-Type': 'text/plain' }).end();
			request.abort();
		}
		request.data += data;
	});

    request.on('error', (err) => {
        console.error(err.stack);
        response.statusCode = 400;
        response.end();
    });

    response.on('error', (err) => {
        console.error(err.stack);
    });

	for (let handler of handlers) {
        if (!handler(request, response)) {
            break;
        }
    }
});

server.listen(config.port, config.host, () => {
    console.log(`Listening on port ${config.port}`);
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
