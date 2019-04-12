function Header() {
	this.header = null;
}

Header.prototype.getHeader = function(content) {
	return `<header><h1>${content}</h1></header>`;
}

module.exports = new Header();