const fs = require('fs');

function getHome(req, res, next) {
	fs.readFile(`${appRoot}/views/index.hbs`, (err, data) => {
		if (err) next(err);
		else res.send(data.toString());
	});
}

module.exports = {
	getHome
};
