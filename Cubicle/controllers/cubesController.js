const Cube = db.model('Cube');

function createGet(req, res, next) {
	res.render('cubes/create', { title: 'Add a cube' });
}

function createPost(req, res, next) {
	const { description, difficulty, imageUrl, name } = req.body;
	Cube.create({ description, difficulty, imageUrl, name }).then(cube => {
		console.log(`A new cube has been created: ${cube.toString()}`);
		res.redirect('/');
	}).catch(exception => {
		let errors = Object.values(exception.errors).map(e => `Invalid ${e.path}!`);
		res.render('cubes/create', { description, difficulty, errors, imageUrl, name, title: 'Add a cube' });
	});
}

function detailsGet(req, res, next) {
	Cube.findById(req.params.id).populate('accessories').then(cube => {
		res.render('cubes/details', { cube, title: 'Cube details' });
	}).catch(next);
}

function search(req, res, next) {
	if (!Object.values(req.body).some(filter => filter)) return res.redirect('/');
	let difficultyFrom = req.body.difficultyFrom || 1;
	let difficultyTo = req.body.difficultyTo || Number.MAX_SAFE_INTEGER;
	let query = {
		difficulty: {
			$gte: Math.min(difficultyFrom, difficultyTo),
			$lte: Math.max(difficultyFrom, difficultyTo),
		}
	};
	if (req.body.name) query.name = new RegExp(req.body.name, 'i');
	let order = { difficulty: 1 };
	if (difficultyFrom > difficultyTo) order.difficulty = -1;
	Cube.find(query).sort(order).then(cubes => {
		res.render('home/index', { cubes, title: 'Home' });
	}).catch(next);
}

module.exports = {
	createGet,
	createPost,
	detailsGet,
	search
};
