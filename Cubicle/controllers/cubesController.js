function createGet(req, res, next) {
	res.render('cubes/create', { title: 'Add a cube' });
}

function createPost(req, res, next) {
	res.redirect('/');
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
