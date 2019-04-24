const Heading = require('../Attributes/Heading/index.js');
const Anchor = require('../Attributes/Anchor/index.js');
const Image = require('../Attributes/Img/index.js');
const Paragraph = require('../Attributes/Paragraph/index.js');
const Project = require('../Attributes/Project/index.js');

function SingleProject() {
 	this.title = null;
 	this.css - null;
}

SingleProject.prototype.getTemplate = function(data, returnPageNumber) {
	let returnBtn;
	let imgTag = '';
	let ParaTag = '';
	if(returnPageNumber === 1) {
		returnBtn = Anchor.getAnchorTag('Back', 'btn', '/');
	} else {
		returnBtn = Anchor.getAnchorTag('Back', 'btn', `/#${returnPageNumber}`);
	}
	let heading = Anchor.getAnchorTag(Heading.getHeadingTag(data.name, 'h1'), 'project-heading', data.url);
	if(data.image_url) {
		imgTag = Image.getImgTag(data.image_url, data.name);
	}
	if(data.description === '') {
		ParaTag = Paragraph.getParagraphTag(data.summary, 'project-desc');
	} else {
		ParaTag = Paragraph.getParagraphTag(data.description, 'project-desc');
	}
	
	let project = Project.getProjectTag('single-project');
	let addIndex = project.indexOf('</Project>');
	let template = [project.slice(0, addIndex), heading, imgTag, ParaTag, returnBtn,  project.slice(addIndex)].join('');
	return template;
}

module.exports = new SingleProject();