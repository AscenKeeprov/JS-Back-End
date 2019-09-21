global.appRoot = process.cwd();

const fs = require('fs');
const handlers = require('./handlers/handlers.js')
const http = require('http');
const processManager = require('child_process');

const server = http.createServer((request, response) => {
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

let config = JSON.parse(fs.readFileSync(`${appRoot}/config.json`, 'utf-8'));

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
