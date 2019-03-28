 function Head() {
 	this.title = null;
 	this.css - null;
}

Head.prototype.setTitle = function(title) {
	return this.title = title;
}

Head.prototype.setCss = function(css) {
	return this.css = css;
}

Head.prototype.getTemplate = function() {
	return `<head><meta charset="utf-8">
	<title>${this.title}</title>
	<style>${this.css}</style>
	</head>`;
}

module.exports = new Head();