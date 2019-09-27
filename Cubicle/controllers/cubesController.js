const Cube = require(`${appRoot}/models/cube.js`);
const ObjectId = require('bson').ObjectId;

function createGet(req, res, next) {
	res.render('cubes/create', { title: 'Add a cube' });
}

function createPost(req, res, next) {
	let id = new ObjectId().toString();
	try {
		let cube = new Cube(id, req.body.name, req.body.description, req.body.imageURL, req.body.difficulty);
		console.log(cube);
		res.redirect('/');
	} catch (error) {
		res.render('cubes/create', { title: 'Add a cube', error });
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
