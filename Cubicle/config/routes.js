const homeController = require(`${appRoot}/controllers/homeController.js`);

module.exports = (app) => {
	app.get('/', (req, res) => {
		homeController.getHome(req, res);
	})
};
