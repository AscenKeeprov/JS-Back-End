const messageTypes = ['error', 'notification'];

module.exports = function captureMessages(req, res, next) {
	let messageEntries = [];
	for (let entry of Object.entries(req.query)) {
		if (messageTypes.includes(entry[0])) {
			messageEntries.push(entry);
			delete req.query[entry[0]];
		}
	}
	if (messageEntries.length > 0) {
		let messages = Object.fromEntries(messageEntries);
		Object.assign(res.locals, messages);
	}
	next();
};
