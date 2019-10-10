const session = require('express-session');

module.exports = session({
	cookie: {
		httpOnly: true,
		sameSite: 'lax'
	},
	name: 'sid',
	resave: false,
	saveUninitialized: false,
	secret: '53cr37',
	unset: 'destroy'
});
