function Anchor() {
	this.content = null;
	this.link = null;
	this.onClick = null;
	this.className = null;
}

Anchor.prototype.getAnchorTag = function(content, className, link=null, onClick=null) {
	this.content = content;
	this.link = link;
	this.onclick = onClick;
	this.className = className;
	if(link) {
		return `<a href=${link} class='${this.className ? this.className : ''}'>${content}</a>`;
	}
	if(onClick) {
		return `<a href='#' onClick=${onClick} class='${this.className ? this.className : ''}'>${content}</a>`;
	}
}

module.exports = new Anchor();