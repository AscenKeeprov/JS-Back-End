const fs = require('fs');
const homeController = require(`${appRoot}/controllers/homeController.js`);
const router = require('express').Router();

router.get('/', (req, res, next) => {
	homeController.getHome(req, res, next);
});

router.use(function (req, res, next) {
	fs.readFile(`${appRoot}/views/404.hbs`, (err, data) => {
		if (err) next(err);
		else res.status(404).send(data.toString());
	});
});

router.use(function (err, req, res, next) {
	console.error(err.stack);
	res.sendStatus(500);
});

module.exports = router;
