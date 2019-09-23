const fs = require('fs');

module.exports = (request, response) => {
	if (request.method === 'GET' && request.url === '/') {
		let viewPath = `${appRoot}/views/home/index.html`;
		fs.readFile(viewPath, (err, html) => {
			if (err) {
				console.error(err.stack);
				response.statusCode = 404;
				response.end(`Error loading view at: ${viewPath}`);
				return;
			}
			response.setHeader('Content-Type', 'text/html');
			response.write(html);
			response.end();
		});
	}
	return true;
};
