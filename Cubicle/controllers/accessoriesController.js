const Accessory = db.model('Accessory');
const Cube = db.model('Cube');

function attachGet(req, res, next) {
	Cube.findById(req.params.cubeId).then(cube => {
		Accessory.find({ cubes: { $nin: cube._id } }).sort({ name: 1 }).then(accessories => {
			res.render('accessories/attach', { accessories, cube, title: 'Attach an accessory' });
		});
	}).catch(next);
}

function attachPost(req, res, next) {
	Cube.findByIdAndUpdate(req.params.cubeId, { $push: { accessories: req.body.accessoryId } }).then(cube => {
		Accessory.findByIdAndUpdate(req.body.accessoryId, { $push: { cubes: cube._id } }).then(accessory => {
			console.log(`Accessory '${accessory.name}' added to cube '${cube.name}'`);
			res.redirect(`/cubes/details/${cube._id}`);
		}).catch(next);
	}).catch(next);
}

function createGet(req, res, next) {
	res.render('accessories/create', { title: 'Add an accessory' });
}

function createPost(req, res, next) {
	const { description, imageUrl, name } = req.body;
	Accessory.create({ description, imageUrl, name }).then(accessory => {
		console.log(`A new accessory has been created: ${accessory.name}`);
		res.redirect('/');
	}).catch(exception => {
		let errors = Object.values(exception.errors).map(e => `Invalid ${e.path}!`);
		res.render('accessories/create', { description, errors, imageUrl, name, title: 'Add an accessory' });
	});
}

module.exports = {
	attachGet,
	attachPost,
	createGet,
	createPost
};
