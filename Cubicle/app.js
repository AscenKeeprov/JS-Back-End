global.appRoot = process.cwd();

const env = process.env.NODE_ENV || 'development';
const config = require(`${appRoot}/config/config.js`)[env];
const app = require('express')();

require(`${appRoot}/config/express`)(app);
require(`${appRoot}/config/routes`)(app);

app.listen(config.port, console.log(`Listening on port ${config.port}`));
