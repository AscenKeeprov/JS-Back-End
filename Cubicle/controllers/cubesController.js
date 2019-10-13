const auth = require(`${app.root}/core/auth.js`);
const Cube = db.model('Cube');

function createGet(req, res, next) {
	if (res.locals.isAuthenticated === false) return res.status(401).render('401', { title: 'Unauthorized' });
	res.render('cubes/create', { title: 'Add a cube' });
}

function createPost(req, res, next) {
	const { description, difficulty, imageUrl, name } = req.body;
	const creatorId = auth.getUserId(req.session.auth);
	Cube.create({ creatorId, description, difficulty, imageUrl, name }).then(cube => {
		console.log(`A new cube has been created: ${cube.toString()}`);
		res.redirect('/');
	}).catch(exception => {
		let errors = Object.values(exception.errors).map(e => `Invalid ${e.path}!`);
		res.render('cubes/create', { description, difficulty, errors, imageUrl, name, title: 'Add a cube' });
	});
}

function deleteGet(req, res, next) {
	if (res.locals.isAuthenticated === false) return res.status(401).render('401', { title: 'Unauthorized' });
	Cube.findById(req.params.id).populate('accessories').then(cube => {
		const userId = auth.getUserId(req.session.auth);
		if (userId != cube.creatorId) return res.status(403).render('403', { title: 'Forbidden' });
		res.render('cubes/delete', { cube, title: 'Delete cube' });
	}).catch(next);
}

function deletePost(req, res, next) {
	Cube.findByIdAndRemove(req.params.id).then(cube => {
		console.log(`Cube deleted: ${cube.toString()}`);
		res.redirect('/');
	}).catch(next);
}

function detailsGet(req, res, next) {
	const userId = auth.getUserId(req.session.auth);
	Cube.findById(req.params.id).populate('accessories').then(cube => {
		res.locals.isAuthorized = userId == cube.creatorId;
		res.render('cubes/details', { cube, title: 'Cube details' });
	}).catch(next);
}

function editGet(req, res, next) {
	if (res.locals.isAuthenticated === false) return res.status(401).render('401', { title: 'Unauthorized' });
	Cube.findById(req.params.id).populate('accessories').then(cube => {
		const userId = auth.getUserId(req.session.auth);
		if (userId != cube.creatorId) return res.status(403).render('403', { title: 'Forbidden' });
		res.render('cubes/edit', { cube, title: 'Edit cube' });
	}).catch(next);
}

function editPost(req, res, next) {
	const { description, difficulty, imageUrl, name } = req.body;
	Cube.findByIdAndUpdate(req.params.id, { description, difficulty, imageUrl, name }, { runValidators: true })
		.then(cube => {
			console.log(`Cube updated: ${cube.toString()}`);
			res.redirect(`/cubes/details/${cube._id}`);
		}).catch(exception => {
			let errors = Object.values(exception.errors).map(e => `Invalid ${e.path}!`);
			res.render('cubes/edit', { description, difficulty, errors, imageUrl, name, title: 'Edit cube' });
		});
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
	deleteGet,
	deletePost,
	detailsGet,
	editGet,
	editPost,
	search
};
