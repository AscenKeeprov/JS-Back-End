const Cube = require(`${app.root}/models/cube.js`);
const fs = require('fs');
const ObjectId = require('bson').ObjectId;

function createGet(req, res, next) {
	res.render('cubes/create', { title: 'Add a cube' });
}

function createPost(req, res, next) {
	const id = new ObjectId().toString();
	const { name, description, imageUrl, difficulty } = req.body;
	try {
		let newCube = new Cube(id, name, description, imageUrl, difficulty);
		const cubesFile = `${app.root}/data/cubes.json`;
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
				let json = JSON.stringify(cubes, null, 4);
				fs.writeFile(cubesFile, json, 'utf-8', () => {
					console.log(`Added cube ${newCube.toString()}`);
				});
				res.redirect('/');
			}
		});
	} catch (error) {
		res.render('cubes/create', { description, difficulty, error, imageUrl, name, title: 'Add a cube' });
	}
}

function detailsGet(req, res, next) {
	try {
		const cubesFile = `${app.root}/data/cubes.json`;
		fs.readFile(cubesFile, (err, data) => {
			if (err) throw err;
			const cubes = JSON.parse(data);
			const cube = cubes.find(c => c._id == req.params.id);
			res.render('cubes/details', { cube, title: 'Cube details' });
		});
	} catch (error) {
		res.redirect('/');
	}
}

module.exports = {
	createGet,
	createPost,
	detailsGet
};
