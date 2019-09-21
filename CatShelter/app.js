const fileManager = require('./fileManager.js');
const http = require('http');
const processManager = require('child_process');

let config = JSON.parse(fileManager.readFile('./config.json'));

const server = http.createServer((request, response) => {
    request.on('error', (err) => {
        console.error(err.stack);
        response.statusCode = 400;
        response.end();
    });

    response.on('error', (err) => {
        console.error(err.stack);
    });

    if (request.url.includes('/content/')) {
        fileManager.readFileAsync(`.${request.url}`, (fileData) => {
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
            response.write(fileData);
            response.end();
        });
    }

    if (request.method === 'GET' && request.url === '/') {
        fileManager.readFileAsync('./views/home/index.html', (html) => {
            response.setHeader('Content-Type', 'text/html');
            response.write(html);
            response.end();
        });
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
