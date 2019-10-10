const controllersDir = `${app.root}/controllers`;
const accessoriesController = require(`${controllersDir}/accessoriesController.js`);
const cubesController = require(`${controllersDir}/cubesController.js`);
const homeController = require(`${controllersDir}/homeController.js`);
const router = require('express').Router();

function handleNotFound(req, res, next) {
	res.render('404', { title: 'Not Found' });
}

function handleError(err, req, res, next) {
	console.error(err);
	return res.sendStatus(500);
}

router.get('/', homeController.index);
router.get('/about', homeController.about);
router.get('/accessories/attach/:cubeId', accessoriesController.attachGet);
router.post('/accessories/attach/:cubeId', accessoriesController.attachPost);
router.get('/accessories/create', accessoriesController.createGet);
router.post('/accessories/create', accessoriesController.createPost);
router.get('/cubes/create', cubesController.createGet);
router.post('/cubes/create', cubesController.createPost);
router.post('/cubes/search', cubesController.search);
router.get('/cubes/details/:id', cubesController.detailsGet);

router.use(handleNotFound);
router.use(handleError);

module.exports = router;
