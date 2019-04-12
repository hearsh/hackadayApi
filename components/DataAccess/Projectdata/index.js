const config = require(`../../Credentials/index.js`);
const usersApi = require(`../Userdata/index.js`);
const fetch = require('node-fetch');

function ProjectData() {
	this.data = null;
	this.page = null;
	this.pageNumber = 1;
	this.pageDic = {};
}

ProjectData.prototype.returnPageNumber = function() {
	return this.pageNumber;
}

ProjectData.prototype.setProjectData = function(data) {
	for(let i = 0; i < data.length; i++) {
		this.pageDic[data[i].id] = data[i];
	}
}

ProjectData.prototype.getSingleProject = function(id) {
	return new Promise((resolve, reject) => {
		if(this.pageDic[id] === undefined) {
			let url = `http://api.hackaday.io/v1/projects/${id}?per_page=10&api_key=${config.apiKey}`;
			fetch(url)
		  .then(response => response.json())
		  .then(data => {
		    resolve(data);
		  });
		} else {
			resolve(this.pageDic[id]);
		}
	});
}

ProjectData.prototype.getPageData = function(page) {
	return new Promise((resolve, reject) => {
		this.pageNumber = page;
		if(page === this.page && this.data) {
			resolve(this.data);
		} else {
			let url = `http://api.hackaday.io/v1/projects?page=${page}&per_page=10&api_key=${config.apiKey}`;
			fetch(url)
		    .then(response => response.json())
		    .then(data => {
		    	this.setProjectData(data.projects);
		    	let userId = '';
		    	for(let i = 0; i < data.projects.length; i++) {
		    		userId = userId + data.projects[i].owner_id + ',';
		    	}
		    	url = `http://api.hackaday.io/v1/users/batch?ids=${userId}&api_key=${config.apiKey}`
		    	fetch(url)
		    	.then(response => response.json())
		    	.then(userData => {
		    		usersApi.setUserData(userData.users);
		    		this.data = data;
			    	this.page = page;
			    	resolve(data);
		    	});
		    });
		}
	});
}

module.exports = new ProjectData();