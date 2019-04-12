function Paragraph() {
	this.content = null;
	this.className = null;
}

Paragraph.prototype.getParagraphTag = function(content, className=null) {
	this.content = content;
	this.className = className;
	return `<p class='${this.className ? this.className : ''}' >${this.content}</p>`;
}

module.exports = new Paragraph();