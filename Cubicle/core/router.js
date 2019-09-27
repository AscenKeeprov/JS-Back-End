const homeController = require(`${appRoot}/controllers/homeController.js`);
const cubesController = require(`${appRoot}/controllers/cubesController.js`);
const router = require('express').Router();

router.get('/', homeController.index);
router.get('/about', homeController.about);
router.get('/cubes/create', cubesController.createGet);
router.post('/cubes/create', cubesController.createPost);
router.get('/cubes/details/:id', cubesController.detailsGet);

router.use(function (req, res, next) {
	res.render('404', { title: 'Not Found' });
});

router.use(function (err, req, res, next) {
	console.error(err.stack);
	res.sendStatus(500);
});

module.exports = router;
