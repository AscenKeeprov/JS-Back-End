const fs = require('fs');

function getContentType(url) {
    let fileTypeIndex = url.lastIndexOf('.');
    let fileType = url.substring(fileTypeIndex + 1);
    switch (fileType.toLowerCase()) {
        case 'css': return 'text/css';
        case 'ico': return 'image/x-icon';
        default: return 'text/plain';
    }
}

module.exports = (request, response) => {
	if (request.method === 'GET' && request.url.includes('/content/')) {
		let filePath = `${appRoot}${request.url}`;
		fs.readFile(filePath, 'utf-8', (err, data) => {
			if (err) {
				console.error(err.stack);
				response.statusCode = 404;
				response.end(`Error reading file at: ${filePath}`);
				return;
			}
			response.setHeader('Content-Type', getContentType(request.url));
			response.write(data);
			response.end();
		});
	}
	return true;
};
