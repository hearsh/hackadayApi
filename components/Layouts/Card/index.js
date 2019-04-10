const Heading = require('../Attributes/Heading/index.js');
const Paragraph = require('../Attributes/Paragraph/index.js');
const Div = require('../Attributes/Div/index.js');
const User = require('../User/index.js');
const Anchor = require('../Attributes/Anchor/index.js');

function Card() {
	this.data = null;
	this.userName = null;
}

Card.prototype.getCardTag = function(data, userName) {
	this.data = data;
	this.userName = userName;
	let heading = Heading.getHeadingTag(this.data.name, 'h1');
	let para = Paragraph.getParagraphTag(this.data.summary, 'summary');
	let userNameTag = `<div class='user-info con-tooltip top' id='${data.owner_id}'>
										${Paragraph.getParagraphTag(`Created By ${userName}`, 'user-name')}
										</div>`;
	let imgDiv = Div.getDivTag('img-div', this.data.image_url);
	let textDiv = Div.getDivTag('text-div', null);
	let addIndex = textDiv.indexOf('</div>'); 
	textDiv = [textDiv.slice(0, addIndex), heading, para, userNameTag, textDiv.slice(addIndex)].join('');
	return `<Card>${imgDiv}${textDiv}</Card>`;
}

module.exports = new Card();