module.exports = class Cube {
	constructor(id, name, description, imageUrl, difficulty) {
		if (this._isValidId(id) == false) throw 'Invalid ID!';
		this._id = id;
		if (this._isValidName(name) == false) throw 'Invalid name!';
		this._name = name;
		this._description = description;
		this._imageUrl = imageUrl;
		if (this._isValidDifficulty(difficulty) == false) throw 'Invalid difficulty!';
		this._difficulty = difficulty;
	}

	get difficulty() {
		return this._difficulty;
	}

	set difficulty(value) {
		value = parseInt(value);
		if (this._isValidDifficulty(value) == false) throw 'Invalid difficulty!';
		this._difficulty = value;
	}

	get id() {
		return this._id;
	}

	set id(value) {
		if (this._isValidId(value) == false) throw 'Invalid ID!';
		this._id = value;
	}

	get name() {
		return this._name;
	}

	set name(value) {
		if (this._isValidName(name) == false) throw 'Invalid name!';
		this._name = value;
	}

	_isValidDifficulty(value) {
		value = parseInt(value);
		if (!value || isNaN(value) || value < 1) return false;
		else return true;
	}

	_isValidId(value) {
		let idPattern = /\b[0-9a-f\-]{24}\b/i;
		if (!value || idPattern.test(value) == false) return false;
		else return true;
	}

	_isValidName(value) {
		if (!value || typeof value != 'string') return false;
		else return true;
	}

	toString() {
		return `${this.name} [${this.difficulty}]`;
	}
};
