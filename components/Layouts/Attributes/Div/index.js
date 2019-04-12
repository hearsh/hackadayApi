function Div() {
	this.className = null;
	this.backgroundImg = null;
}

Div.prototype.getDivTag = function(className, backgroundImg=null) {
	this.className = className;
	this.backgroundImg = backgroundImg;
	let style = `style="background-image: url(${this.backgroundImg}?w=600&h=600)"`;
	return `<div class='${this.className}' ${this.backgroundImg ? style : ''}></div>`;
}

module.exports = new Div();