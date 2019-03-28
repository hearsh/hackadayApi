const Heading = require('../Attributes/Heading/index.js');
const Paragraph = require('../Attributes/Paragraph/index.js');
const Img = require('../Attributes/Img/index.js');

function Card() {
	this.data = null;
}

Card.prototype.getCardTag = function(data) {
	this.data = data;
	let heading = Heading.getHeadingTag(this.data.name, 'h1');
	let para = Paragraph.getParagraphTag(this.data.summary);
	let img = Img.getImgTag(this.data.image_url, this.data.name);
	return `<Card><div class='img-div'>${img}</div><div class='text-div'>${heading}${para}</div></Card>`;
}

module.exports = new Card();