const Cube = db.model('Cube');

function createGet(req, res, next) {
	res.render('cubes/create', { title: 'Add a cube' });
}

function createPost(req, res, next) {
	const { name, description, imageUrl, difficulty } = req.body;
	Cube.create({ name, description, imageUrl, difficulty }).then(cube => {
		console.log(`A new cube has been created: ${cube.name} [${cube.difficulty}]`);
		res.redirect('/');
	}).catch(exception => {
		let error = exception.errors.name;
		if (error.kind == 'required') {
			error = `Field '${error.path}' cannot be empty!`;
		}
		res.render('cubes/create', { description, difficulty, error, imageUrl, name, title: 'Add a cube' });
	});
}

function detailsGet(req, res, next) {
	Cube.findById(req.params.id).then(cube => {
		res.render('cubes/details', { cube, title: 'Cube details' });
	}).catch(() => { res.redirect('/'); });
}

module.exports = {
	createGet,
	createPost,
	detailsGet
};
