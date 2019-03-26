const Html = require(`../Global/index.js`);
const Head = require(`../Head/index.js`);
const Body = require(`../Body/index.js`);

const GenTemplate = () => {
	Head.setTitle('Projects');
	let headTemplate = Head.getTemplate();
	let addIndex = Html.indexOf('</html>'); 
	let template = [Html.slice(0, addIndex), headTemplate, Body, Html.slice(addIndex)].join('');
	return template;
}

module.exports = GenTemplate();