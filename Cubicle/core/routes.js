const homeController = require(`${appRoot}/controllers/homeController.js`);

module.exports = (app) => {
	app.get('/', (req, res, next) => {
		homeController.getHome(req, res, next);
	})
};
