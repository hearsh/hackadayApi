const Header = require(`../Header/index.js`);

function Body() {
	this.js = null;
}

Body.prototype.getBodyTag = function(js) {
	this.js = js;
	let header = Header.getHeader('Hackaday - By Hearsh Mahidharia');
	return `<body>${header}
	<script type="application/javascript" src="${this.js}"></script>
	</body>`;
}

module.exports = new Body();