const catHandler = require(`${appRoot}/handlers/cat.js`);
const homeHandler = require(`${appRoot}/handlers/home.js`);
const staticHandler = require(`${appRoot}/handlers//static.js`);

module.exports = [
    catHandler,
    homeHandler,
    staticHandler
];
