function Body() {
	this.js = null;
}

Body.prototype.getBodyTag = function(js) {
	this.js = js;
	return `<body>
	<script type="application/javascript" src="${this.js}"></script>
	</body>`;
}

module.exports = new Body();