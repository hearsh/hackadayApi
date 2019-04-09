const Html = require(`../Global/index.js`);
const Head = require(`../Head/index.js`);
const Body = require(`../Body/index.js`);
const sass = require('node-sass');

const GenTemplate = () => {
	let scss_content = `components/Sass/index.sass`;
	let result = sass.renderSync({
	  file: scss_content,
	});
	Head.setCss(result.css.toString('utf8'));
	Head.setTitle('Projects');
	let bodyTag = Body.getBodyTag('./javascripts/app.js');
	let headTemplate = Head.getTemplate();
	let addIndex = Html.indexOf('</html>'); 
	let template = [Html.slice(0, addIndex), headTemplate, bodyTag, Html.slice(addIndex)].join('');
	return template;
}

module.exports = GenTemplate();