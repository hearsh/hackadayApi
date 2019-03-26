function Img() {
	this.title = null;
	this.src = null;
}

Img.prototype.getImgTag = function(src, title) {
	this.title = title;
	this.src = src;
	return `<img src='${src}' alt='${title}'/>`;
}

module.exports = new Img();