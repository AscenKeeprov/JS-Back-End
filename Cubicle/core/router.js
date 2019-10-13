const controllersDir = `${app.root}/controllers`;
const accessoriesController = require(`${controllersDir}/accessoriesController.js`);
const cubesController = require(`${controllersDir}/cubesController.js`);
const homeController = require(`${controllersDir}/homeController.js`);
const usersController = require(`${controllersDir}/usersController.js`);

const router = require('express').Router();

function handleNotFound(req, res, next) {
	return res.status(404).render('404', { title: 'Not Found' });
}

function handleError(err, req, res, next) {
	console.error(err);
	return res.sendStatus(500);
}

router.get('/', homeController.index);
router.get('/about', homeController.about);
router.route('/accessories/attach/:cubeId')
	.get(accessoriesController.attachGet)
	.post(accessoriesController.attachPost);
router.route('/accessories/create')
	.get(accessoriesController.createGet)
	.post(accessoriesController.createPost);
router.route('/cubes/create')
	.get(cubesController.createGet)
	.post(cubesController.createPost);
router.post('/cubes/search', cubesController.search);
router.get('/cubes/details/:id', cubesController.detailsGet);
router.route('/users/login')
	.get(usersController.loginGet)
	.post(usersController.loginPost);
router.get('/users/logout', usersController.logout);
router.route('/users/register')
	.get(usersController.registerGet)
	.post(usersController.registerPost);

router.use(handleNotFound);
router.use(handleError);

module.exports = router;
