const Cube = db.model('Cube');

function about(req, res, next) {
	res.render('home/about', { title: 'About' });
}

function index(req, res, next) {
	Cube.find({}).then(cubes => {
		res.render('home/index', { cubes, title: 'Home' });
	}).catch(err => { console.error(err); });
}

module.exports = {
	about,
	index
};
