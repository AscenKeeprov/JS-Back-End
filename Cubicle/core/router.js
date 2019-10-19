const controllers = require(`${app.root}/controllers`);
const router = require('express').Router();

function handleNotFound(req, res, next) {
	return res.status(404).render('404', { title: 'Not Found' });
}

function handleError(err, req, res, next) {
	console.error(err);
	return res.sendStatus(500);
}

router.get('/', controllers.home.index);
router.get('/about', controllers.home.about);
router.route('/accessories/attach/:cubeId')
	.get(controllers.accessories.attachGet)
	.post(controllers.accessories.attachPost);
router.route('/accessories/create')
	.get(controllers.accessories.createGet)
	.post(controllers.accessories.createPost);
router.route('/cubes/create')
	.get(controllers.cubes.createGet)
	.post(controllers.cubes.createPost);
router.route('/cubes/delete/:id')
	.get(controllers.cubes.deleteGet)
	.post(controllers.cubes.deletePost);
router.get('/cubes/details/:id', controllers.cubes.detailsGet);
router.route('/cubes/edit/:id')
	.get(controllers.cubes.editGet)
	.post(controllers.cubes.editPost);
router.post('/cubes/search', controllers.cubes.search);
router.route('/users/login')
	.get(controllers.users.loginGet)
	.post(controllers.users.loginPost);
router.get('/users/logout', controllers.users.logout);
router.route('/users/register')
	.get(controllers.users.registerGet)
	.post(controllers.users.registerPost);

router.use(handleNotFound);
router.use(handleError);

module.exports = router;
