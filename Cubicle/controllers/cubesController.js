const Cube = require(`${appRoot}/models/cube.js`);
const fs = require('fs');
const ObjectId = require('bson').ObjectId;

function createGet(req, res, next) {
	res.render('cubes/create', { title: 'Add a cube' });
}

function createPost(req, res, next) {
	let id = new ObjectId().toString();
	try {
		let newCube = new Cube(id, req.body.name, req.body.description, req.body.imageURL, req.body.difficulty);
		const cubesFile = `${appRoot}/data/cubes.json`;
		fs.readFile(cubesFile, (err, data) => {
			if (err) throw err;
			let cubes = JSON.parse(data);
			let cubeExists = false;
			for (let cube of cubes) {
				if (cube._name.toLowerCase().localeCompare(newCube.name.toLowerCase()) === 0) {
					cubeExists = true;
					break;
				}
			}
			if (cubeExists) res.render('cubes/create', {
				error: `A cube named ${newCube.name} already exists!`,
				title: 'Add a cube',
			});
			else {
				cubes.push(newCube);
				let json = JSON.stringify(cubes);
				fs.writeFile(cubesFile, json, 'utf-8', () => {
					console.log(`Added cube ${newCube.toString()}`);
				});
				res.redirect('/');
			}
		});
	} catch (error) {
		res.render('cubes/create', { error, title: 'Add a cube' });
	}
}

function detailsGet(req, res, next) {
	let cubeId = req.params.id;
	console.log(`Browsing details for cube with ID ${cubeId}`);
	res.render('cubes/details', { title: 'Cube details' });
}

module.exports = {
	createGet,
	createPost,
	detailsGet
};
