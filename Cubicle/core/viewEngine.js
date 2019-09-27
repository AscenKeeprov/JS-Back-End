const handlebars = require('express-handlebars').create({
	defaultLayout: 'base',
	extname: '.hbs',
	helpers: {
		year: function () {
			return new Date().getUTCFullYear();
		},
	},
	layoutsDir: `${appRoot}/views/layouts`,
	partialsDir: `${appRoot}/views/partials`
});


module.exports = (app) => {
	app.engine(handlebars.extname, handlebars.engine);
	app.set('view engine', handlebars.extname);
	app.set('views', `${appRoot}/views`);
};
