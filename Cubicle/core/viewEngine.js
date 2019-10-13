app.set('views', `${app.root}/views`);

const viewEngine = require('express-handlebars').create({
	defaultLayout: 'base',
	extname: '.hbs',
	helpers: {
		select: function (value, options) {
			return options.fn(this).replace(new RegExp(` value=\"${value}\"`), '$& selected');
		},
		year: function () {
			return new Date().getUTCFullYear();
		},
	},
	layoutsDir: `${app.get('views')}/layouts`,
	partialsDir: `${app.get('views')}/partials`
});

app.engine(viewEngine.extname, viewEngine.engine);
app.set('view engine', viewEngine.extname);

module.exports = viewEngine;
