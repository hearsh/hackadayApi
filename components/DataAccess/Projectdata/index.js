/*
Helper functions for project data.
Fetches data from hackaday api for projects and users.
*/
const config = require(`../../Credentials/index.js`);
const usersApi = require(`../Userdata/index.js`);
const axios = require('axios');

function ProjectData() {
	this.pageNumber = null;
	this.lastPage = null;
	this.pageDic = {};
	this.pageCache = {
		'current': {
			'pageNumber': null,
			'data': null,
		},
		'prev': {
			'pageNumber': null,
			'data': null,
		},
		'next': {
			'pageNumber': null,
			'data': null,
		},
	};
}

ProjectData.prototype.returnPageNumber = function() {
	return this.pageNumber;
}

ProjectData.prototype.setProjectData = function(data) {
	for(let i = 0; i < data.projects.length; i++) {
		this.pageDic[data.projects[i].id] = data.projects[i];
	}
}

ProjectData.prototype.getSingleProject = function(id) {
	return new Promise((resolve, reject) => {
		if(this.pageDic[id] === undefined) {
			let url = `http://api.hackaday.io/v1/projects/${id}?api_key=${config.apiKey}`;
			axios.get(url)
		  .then(data => {
		    resolve(data.data);
		  }).catch(err => {
		  	console.log(err);
		  })
		} else {
			resolve(this.pageDic[id]);
		}
	});
}

ProjectData.prototype.checkIfPageExists = function(page) {
	let check = ['current', 'prev', 'next'];
	for(let i = 0; i < check.length; i++) {
		if(this.pageCache[check[i]].pageNumber && this.pageCache[check[i]].pageNumber === page) {
			return check[i];
		}
	}
	return null;
}

ProjectData.prototype.setCache = async function(page, type) {
	return new Promise((resolve, reject) => {
		if(page !== 0 && page !== this.lastPage) {
			let check = this.checkIfPageExists(page);
			if(check) {
				this.pageCache[type].data = this.pageCache[check].data;
				this.pageCache[type].pageNumber = page;
				resolve();
			} else {
				this.fetchFromHackaday(page).then(data => {
					this.pageCache[type].data = data;
					this.pageCache[type].pageNumber = page;
					console.log(`Cached page ${page}`);
					resolve();
				});
			}
		} else {
			resolve();
		}
	});
}

ProjectData.prototype.fetchFromHackaday = function(page) {
	return new Promise((resolve, reject) => {
		let url = `http://api.hackaday.io/v1/projects?page=${page}&per_page=10&api_key=${config.apiKey}`;
		axios.get(url)
	  .then(data => {
	  	data = data.data;
	  	let userId = '';
	  	if(!this.lastPage) {
	  		this.lastPage = data.last_page;
	  	}
	  	for(let i = 0; i < data.projects.length; i++) {
	  		userId = userId + data.projects[i].owner_id + ',';
	  	}
	  	url = `http://api.hackaday.io/v1/users/batch?ids=${userId}&api_key=${config.apiKey}`
	  	axios.get(url)
	  	.then(userData => {
	  		userData = userData.data;
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
		let check = this.checkIfPageExists(page);
		if(check) {
			if(check === 'current') {
				resolve(this.pageCache[check].data.projects);
			} else {
				let returnData = Object.assign({}, this.pageCache[check]);
				this.setCache(page - 1, 'prev').then(value => {
					this.setCache(page + 1, 'next').then(value => {
						this.pageCache['current'] = returnData;
					});
				});
				this.setProjectData(returnData.data.projects);
				usersApi.setUserData(returnData.data.users.users);
				resolve(returnData.data.projects);
			}
		} else {
			this.fetchFromHackaday(page).then(data => {
				this.pageNumber = page;
				this.pageCache['current'].data = data;
				this.pageCache['current'].pageNumber = page;
				this.setCache(page - 1, 'prev');
				this.setCache(page + 1, 'next');
				this.setProjectData(data.projects);
				usersApi.setUserData(data.users.users);
				resolve(data.projects);
			});
		}
	});
}

module.exports = new ProjectData();