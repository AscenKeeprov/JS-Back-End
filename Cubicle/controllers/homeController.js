function about(req, res, next) {
	res.render('home/about', { title: 'About' });
}

function index(req, res, next) {
	res.render('home/index', { title: 'Home' });
}

module.exports = {
	about,
	index
};
