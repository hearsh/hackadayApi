const express = require('express');
const router = express.Router();

// My modules
const template = require(`../components/Layouts/GenTemplate/index.js`);
const Project = require(`../components/Layouts/Attributes/Project/index.js`);
const ProjectData = require(`../components/DataAccess/Projectdata/index.js`);
const UserData = require(`../components/DataAccess/Userdata/index.js`);
const Card = require(`../components/Layouts/Card/index.js`);
const Arrows = require(`../components/Layouts/Arrows/index.js`);
const SingleProject = require(`../components/Layouts/SingleProject/index.js`);
const Div = require(`../components/Layouts/Attributes/Div/index.js`);
const Heading = require(`../components/Layouts/Attributes/Heading/index.js`);
const Recommender = require(`../components/DataAccess/Recommender/index.js`);

/* 
GET home page.
Fetches data for 10 prjects and creates an html 
view based on the helper functions.
*/
router.get('/', function(req, res, next) {
	ProjectData.getPageData(1).then(data => {
		let allCards = '';
		data.projects.forEach((singleProject) => {
			allCards = allCards + Card.getCardTag(singleProject, UserData.getUserName(singleProject.owner_id));
		});
		let project = Project.getProjectTag();
		let addIndex = project.indexOf('</Project>');
		let arrows = Arrows.getArrows(2, false);
		let projectDiv = [project.slice(0, addIndex), allCards, arrows, project.slice(addIndex)].join('');
		let recommender = Div.getDivTag('recommender', null, 'recommender');
		addIndex = recommender.indexOf('</div>');
		let recommenderHeading = Heading.getHeadingTag('Recommendation', 'h3');
		recommender = [recommender.slice(0, addIndex), recommenderHeading, recommender.slice(addIndex)].join('');
		let divTag = Div.getDivTag('content');
		addIndex = divTag.indexOf('</div>');
		projectDiv = [divTag.slice(0, addIndex), projectDiv, recommender, divTag.slice(addIndex)].join('');
		addIndex = template.indexOf('<script type="application/javascript" src="./javascripts/app.js">');
		let templateDiv = [template.slice(0, addIndex), projectDiv, template.slice(addIndex)].join('');
		res.set({'content-type': 'text/html'}).status(200).send(templateDiv);
	});
});

/*
GET single project
Fetches single project data based on id.
Generates html view for it and sends it.
*/
router.get('/projects/:id', function(req, res, next) {
	let id = req.params.id;
	ProjectData.getSingleProject(id).then(projectdata => {
		let singleProjectDiv = SingleProject.getTemplate(projectdata, ProjectData.returnPageNumber());
		let divTag = Div.getDivTag('content');
		let addIndex = divTag.indexOf('</div>');
		let content = [divTag.slice(0, addIndex), singleProjectDiv, divTag.slice(addIndex)].join('');
		let modifiedTemp = template.replace('<script type="application/javascript" src="./javascripts/app.js"></script>', "");
		addIndex = modifiedTemp.indexOf('</body>');
		let templateDiv = [modifiedTemp.slice(0, addIndex), content, modifiedTemp.slice(addIndex)].join('');
		UserData.getUserData(projectdata.owner_id).then(data => {
			Recommender.setRecommender(projectdata.tags, data.tags, projectdata.id);
			res.set({'content-type': 'text/html'}).status(200).send(templateDiv);
		});
	});
});

/*
Sends recomendations for users and projects.
*/
router.get('/getRecommendation', function(req, res, next) {
	Recommender.fetchRecommendation('projects').then((projectData) => {
		Recommender.fetchRecommendation('users').then((usersData) => {
			res.status(200).json({
				'projectData': projectData,
				'usersData': usersData,
			});
		});
	});
});

/*
POST request for a page
Fetches data for a single page, ased on the page number.
*/
router.post('/getPage', function(req, res, next) {
	let page = parseInt(req.body.id);
	ProjectData.getPageData(page).then(data => {
		let allCards = '';
		data.projects.forEach((singleProject) => {
			allCards = allCards + Card.getCardTag(singleProject, UserData.getUserName(singleProject.owner_id));
		});
		let arrows;
		if(page !== 1) {
			arrows = Arrows.getArrows(page + 1, page - 1);
		} else {
			arrows = Arrows.getArrows(page + 1, false);
		}
		if(page === ProjectData.last_page) {
			arrows = Arrows.getArrows(false, page - 1);
		}
		let projectDiv = [allCards, arrows].join('');
		res.set({'content-type': 'text/html'}).status(200).send(projectDiv);
	});
});

module.exports = router;
