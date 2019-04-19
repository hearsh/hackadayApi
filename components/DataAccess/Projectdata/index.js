const config = require(`../../Credentials/index.js`);
const usersApi = require(`../Userdata/index.js`);
const fetch = require('node-fetch');

function ProjectData() {
	this.data = null;
	this.pageNumber = null;
	this.pageDic = {};
	this.pageCache = {};
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

ProjectData.prototype.setCache = async function(page) {
	let current = null;
	let prev = null;
	let next = null;
	if(this.pageCache.current !== undefined) {
		if(this.pageCache.prev !== undefined) {
			if(this.pageCache.prev.pageNumber === page - 1) {

			}
		}
	}
}

ProjectData.prototype.fetchFromHackaday = function(page) {
	return new Promise((resolve, reject) => {
		let url = `http://api.hackaday.io/v1/projects?page=${page}&per_page=10&api_key=${config.apiKey}`;
		fetch(url)
	  .then(response => response.json())
	  .then(data => {
	  	let userId = '';
	  	for(let i = 0; i < data.projects.length; i++) {
	  		userId = userId + data.projects[i].owner_id + ',';
	  	}
	  	url = `http://api.hackaday.io/v1/users/batch?ids=${userId}&api_key=${config.apiKey}`
	  	fetch(url)
	  	.then(response => response.json())
	  	.then(userData => {
	    	resolve({
	    		'projects': data,
	    		'users': userData,
	    	});
	  	});
	  });
	});
}

ProjectData.prototype.getPageData = function(page) {
	return new Promise((resolve, reject) => {
		this.pageNumber = page;
		if(page === this.pageNumber && this.data) {
			resolve(this.data);
		} else {
			this.fetchFromHackaday(page).then(data => {
				this.data = data.project;
				this.pageNumber = page;
				this.setProjectData(data.projects.projects);
				usersApi.setUserData(data.users.users);
				resolve(data.projects);
			});
		}
	});
}

module.exports = new ProjectData();