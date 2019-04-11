const express = require('express');
const router = express.Router();

// My modules
let template = require(`../components/Layouts/GenTemplate/index.js`);
let project = require(`../components/Layouts/Attributes/Project/index.js`);
const ProjectData = require(`../components/DataAccess/Projectdata/index.js`);
const UserName = require(`../components/DataAccess/Userdata/index.js`);
const Card = require(`../components/Layouts/Card/index.js`);
const Arrows = require(`../components/Layouts/Arrows/index.js`);

/* GET home page. */
router.get('/', function(req, res, next) {
	ProjectData.getData(1).then(data => {
		let allCards = '';
		data.projects.forEach((singleProject) => {
			allCards = allCards + Card.getCardTag(singleProject, UserName.getUserName(singleProject.owner_id));
		});
		let addIndex = project.indexOf('</Project>');
		let arrows = Arrows.getArrows(2, false);
		let projectDiv = [project.slice(0, addIndex), allCards, arrows, project.slice(addIndex)].join('');
		addIndex = template.indexOf('<script type="application/javascript" src="./javascripts/app.js">');
		let templateDiv = [template.slice(0, addIndex), projectDiv, template.slice(addIndex)].join('');
		res.set({'content-type': 'text/html'}).status(201).send(templateDiv);
	});
});

router.post('/getPage', function(req, res, next) {
	let page = req.body.id;
	ProjectData.getData(page).then(data => {
		let allCards = '';
		data.projects.forEach((singleProject) => {
			allCards = allCards + Card.getCardTag(singleProject, UserName.getUserName(singleProject.owner_id));
		});
		let arrows;
		page = parseInt(page);
		if(page !== 1) {
			arrows = Arrows.getArrows(page + 1, page - 1);
		} else {
			arrows = Arrows.getArrows(page + 1, false);
		}
		if(page === ProjectData.last_page) {
			arrows = Arrows.getArrows(false, page - 1);
		}
		let projectDiv = [allCards, arrows].join('');
		res.set({'content-type': 'text/html'}).status(201).send(projectDiv);
	});
});

module.exports = router;
