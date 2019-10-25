const controllers = require(`${app.root}/controllers`);
const { check } = require('express-validator');
const router = require('express').Router();

function handleNotFound(req, res, next) {
	return res.status(404).render('404', { title: 'Not Found' });
}

function handleServerError(err, req, res, next) {
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
	.post([
		check('username').escape(),
		check('password').escape()
	], controllers.users.loginPost);
router.get('/users/logout', controllers.users.logout);
router.route('/users/register')
	.get(controllers.users.registerGet)
	.post([
		check('username').exists().trim().not().isEmpty().withMessage('Username cannot be empty!'),
		check('username').isLength({ min: 4 }).withMessage('Username must be 4 or more characters long!'),
		check('username').isLength({ max: 50 }).withMessage('Username must be no more than 50 characters long!'),
		check('username').matches(/^[0-9A-Za-z]+$/i).withMessage('Username must contain only English letters and digits!'),
		check('password').exists().trim().not().isEmpty().withMessage('Password cannot be empty!'),
		check('password').isLength({ min: 8 }).withMessage('Password must be 8 or more characters long!'),
		check('password').matches(/^(?=.*[0-9])(?=.*[a-z])([0-9A-Za-z]+)$/i)
			.withMessage('Password should contain at least one English letter and one digit!'),
		check('rePassword').custom((value, { req }) => (value === req.body.password)).withMessage('Passwords do not match!')
	], controllers.users.registerPost);

router.use(handleNotFound);
router.use(handleServerError);

module.exports = router;
