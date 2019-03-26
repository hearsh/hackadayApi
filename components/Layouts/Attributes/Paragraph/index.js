function Paragraph() {
	this.content = null;
}

Paragraph.prototype.getParagraphTag = function(content) {
	this.content = content;
	return `<p>${this.content}</p>`;
}

module.exports = new Paragraph();