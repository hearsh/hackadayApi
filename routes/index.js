const express = require('express');
const router = express.Router();

// My modules
let template = require(`../components/Layouts/GenTemplate/index.js`);
let project = require(`../components/Layouts/Attributes/Project/index.js`);
const ProjectData = require(`../components/DataAccess/Projectdata/index.js`);
const Card = require(`../components/Layouts/Card/index.js`);

/* GET home page. */
router.get('/', function(req, res, next) {
	ProjectData.getData(1).then(data => {
		let allCards = '';
		data.projects.forEach((singleProject) => { 
			allCards = allCards + Card.getCardTag(singleProject);
		});
		let addIndex = project.indexOf('</Project>');
		project = [project.slice(0, addIndex), allCards, project.slice(addIndex)].join('');
		addIndex = template.indexOf('</body>');
		template = [template.slice(0, addIndex), project, template.slice(addIndex)].join('');
		res.set({'content-type': 'text/html'}).status(201).send(template);
	});
});

module.exports = router;
