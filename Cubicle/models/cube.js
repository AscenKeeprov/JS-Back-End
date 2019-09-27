module.exports = class Cube {
	idPattern = /\b[0-9a-f\-]{24}\b/i;

	constructor(id, name, description, imageURL, difficulty) {
		if (!id.match(this.idPattern)) throw 'Invalid ID!';
		this._id = id;
		if (!name || typeof name != 'string') throw 'Invalid name!';
		this._name = name;
		this._description = description;
		this._imageURL = imageURL;
		if (!difficulty || typeof difficulty != 'string') throw 'Invalid difficulty!';
		this._difficulty = difficulty;
	}

	get difficulty() {
		return this._difficulty;
	}

	set difficulty(value) {
		if (!value || typeof value != 'string') throw 'Invalid difficulty!';
		this._difficulty = value;
	}

	get id() {
		return this._id;
	}

	set id(value) {
		if (!value.match(this.idPattern)) throw 'Invalid ID!';
		this._id = value;
	}

	get name() {
		return this._name;
	}

	set name(value) {
		if (!value || typeof value != 'string') throw 'Invalid name!';
		this._name = value;
	}

	toString() {
		return `${this.name} [${this.difficulty}]`;
	}
};
