const cats = require(`${appRoot}/data/cats.json`);
//const formidable = require('formidable');
const fs = require('fs');
const qs = require('querystring');

module.exports = (request, response) => {
	if (request.url === '/cats/add-breed') {
		if (request.method === 'GET') {
			let viewPath = `${appRoot}/views/breeds/addBreed.html`;
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

		if (request.method === 'POST') {
			request.on('end', () => {
				let body = qs.parse(request.data);
				const breedsFile = `${appRoot}/data/breeds.json`;
				fs.readFile(breedsFile, (err, data) => {
					if (err) throw err;
					let breeds = JSON.parse(data);
					let breedExists = false;
					for (let breed of breeds) {
						if (breed.toLowerCase().localeCompare(body.breed.toLowerCase()) === 0) {
							breedExists = true;
							break;
						}
					}
					if (breedExists) {
						response.end(`Breed ${body.breed} has already been added!`);
					} else {
						breeds.push(body.breed);
						breeds.sort((b1, b2) => b1.toLowerCase().localeCompare(b2.toLowerCase()));
						let json = JSON.stringify(breeds);
						fs.writeFile(breedsFile, json, 'utf-8', () => {
							console.log(`Added breed '${body.breed}'`);
						});
						response.writeHead(303, { 'Location': '/' });
						response.end();
					}
				});
			});
		}
	}
	if (request.url === '/cats/add-cat') {
		if (request.method === 'GET') {
			let viewPath = `${appRoot}/views/cats/addCat.html`;
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
		if (request.method === 'POST') {
			//TODO
		}
	}
	return true;
};
