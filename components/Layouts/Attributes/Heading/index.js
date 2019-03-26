function Heading() {
	this.text = null;
	this.heading = 'h1';
}

Heading.prototype.getHeadingTag = function(text, heading) {
	this.text = text;
	this.heading = heading;
	return `<${this.heading}>${this.text}</${this.heading}>`;
}

module.exports = new Heading();