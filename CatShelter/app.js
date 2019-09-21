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

    if (request.url.includes('/content/')) {
        let filePath = `${appRoot}${request.url}`;
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                console.error(err.stack);
                response.statusCode = 404;
                response.end(`Error reading file at: ${filePath}`);
                return;
            }
            let fileTypeIndex = request.url.lastIndexOf('.');
            let fileType = request.url.substring(fileTypeIndex + 1);
            let contentType;
            switch (fileType.toLowerCase()) {
                case 'css':
                    contentType = 'text/css';
                    break;
                case 'ico':
                    contentType = 'image/x-icon';
                    break;
                default:
                    contentType = 'text/plain';
            }
            response.setHeader('Content-Type', contentType);
            response.write(data);
            response.end();
        });
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
