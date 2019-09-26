const handlebars = require('express-handlebars').create({
	defaultLayout: 'base',
	extname: '.hbs',
	layoutsDir: `${appRoot}/views/layouts`,
	partialsDir: `${appRoot}/views/partials`
	//Custom helpers defined here are registered only with this instance
	//helpers: {
	//	foo: function () { return 'FOO!'; },
	//	bar: function () { return 'BAR!'; }
	//}
});

module.exports = (app) => {
	app.engine(handlebars.extname, handlebars.engine);
	app.set('view engine', handlebars.extname);
	app.set('views', `${appRoot}/views`);
};
