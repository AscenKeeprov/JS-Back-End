module.exports = class Cube {
	constructor(id, name, description, imageURL, difficulty) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.imageURL = imageURL;
		this.difficulty = difficulty;
	}

	toString() {
		return `${this.name} [${this.difficulty}]`;
	}
};
