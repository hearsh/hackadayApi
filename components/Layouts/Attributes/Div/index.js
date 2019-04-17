function Div() {
	this.className = null;
	this.backgroundImg = null;
	this.id = null;
}

Div.prototype.getDivTag = function(className, backgroundImg=null, id=null,) {
	this.className = className;
	this.backgroundImg = backgroundImg;
	this.id = id;
	let idDiv = `id="${this.id}"`;
	let style = `style="background-image: url(${this.backgroundImg}?w=600&h=600)"`;
	return `<div class='${this.className}' ${this.id ? idDiv : ''} ${this.backgroundImg ? style : ''}></div>`;
}

module.exports = new Div();