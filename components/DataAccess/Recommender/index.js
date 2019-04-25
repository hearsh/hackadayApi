/*
Maintains recommender data for user.
Helper functions to set recommendations and get them.
*/
const MinHeap = require(`../MinHeap/index.js`);
const config = require(`../../Credentials/index.js`);
const axios = require('axios');

function Recommender() {
	this.data = {
		'tags': null,
		'users': null,
		'tagLength': 0,
		'userLength': 0,
		'projectsViewed': {},
	}
}

Recommender.prototype.setRecommender = function(tags, users, projectId) {
	if(!this.data.tags && tags) {
		this.data.tags = {};
	}
	if(!this.data.users && users) {
		this.data.users = {};
	}
	this.data.projectsViewed[projectId] = true;
	this.addTags(tags);
	this.addUsers(users);
}

Recommender.prototype.addTags = function(tags) {
	if(tags) {
		this.data.tagLength = this.data.tagLength + tags.length;
		for(let i = 0; i < tags.length; i++) {
			if(this.data.tags[tags[i]] === undefined) {
				this.data.tags[tags[i]] = {
					'score': (1 / this.data.tagLength),
					'count': 1,
				}
			} else {
				this.data.tags[tags[i]] = {
					'score': ((this.data.tags[tags[i]].count + 1) / this.data.tagLength),
					'count': (this.data.tags[tags[i]].count + 1),
				}
			}
		}
	}
}

Recommender.prototype.addUsers = function(users) {
	if(users) {
		this.data.userLength = this.data.userLength + users.length;
		for(let i = 0; i < users.length; i++) {
			if(this.data.users[users[i]] === undefined) {
				this.data.users[users[i]] = {
					'score': (1 / this.data.userLength),
					'count': 1,
				}
			} else {
				this.data.users[users[i]] = {
					'score': ((1 + this.data.users[users[i]].count) / this.data.userLength),
					'count': (1 + this.data.users[users[i]].count),
				}
			}
		}
	}
}

Recommender.prototype.getRecommendation = function(type) {
	MinHeap.clearHeap();
	if(type === 'projects') {
		if(this.data.tags === null) {
			return null;
		}
		for(key in this.data.tags) {
			MinHeap.addToHeap({
				'id': key,
				'score': this.data.tags[key].score,
			});
		}
	}
	if(type === 'users') {
		if(this.data.users === null) {
			return null;
		}
		for(key in this.data.users) {
			MinHeap.addToHeap({
				'id': key,
				'score': this.data.users[key].score,
			});
		}
	}
	return MinHeap.getHeap();
}

Recommender.prototype.fetchProjectData = function(tags) {
	return new Promise((resolve, reject) => {
		if(tags === '') {
			resolve(null);
		}
		let url = `http://api.hackaday.io/v1/projects/search?search_term=${tags}&per_page=5&api_key=${config.apiKey}`;
		axios.get(url)
	  .then(data => {
	  	data = data.data;
	  	let finalData = {};
	  	let check = 0;
	  	if(data.projects.length) {
	  		for(let i = 0; i < data.projects.length; i++) {
	  			if(data.projects[i].name !== undefined && 
	  				this.data.projectsViewed[data.projects[i].id] === undefined) {
	  				finalData[data.projects[i].id] = {
			  			'name': data.projects[i].name,
			  			'link': `/projects/${data.projects[i].id}`,
			  		};
			  		check += 1;
			  		if(check === 3) {
			  			break;
			  		}
	  			}
		  	}
	  	}
	  	resolve(finalData);
	  });
	});
}

Recommender.prototype.fetchUserData = function(tags) {
	return new Promise((resolve, reject) => {
		if(tags === '') {
			resolve(null);
		}
		let finalData = {};
		for(let i = 0; i < tags.length; i++) {
			let url = `http://api.hackaday.io/v1/users/search?tag=${tags[i].id}&per_page=1&api_key=${config.apiKey}`;
			axios.get(url)
		  .then(data => {
		  	data = data.data;
		  	if(data.users) {
		  		finalData[data.users[0].id] = {
		  			'name': data.users[0].username,
		  			'link': `${data.users[0].url}`,
				  };
		  	}
		  	if(i === 2) {
		  		resolve(finalData);
		  	}
		  });
		}
	});
}

Recommender.prototype.fetchRecommendation = function(type) {
	return new Promise((resolve, reject) => {
		let tags = this.getRecommendation(type);
		if(tags) {
			if(type === 'projects') {
				let tagTxt = '';
				for(let i = 0; i < tags.length; i++) {
					tagTxt = tagTxt + " " + tags[i].id;
				}
				this.fetchProjectData(tagTxt).then(data => {
					resolve(data);
				});
			}
			if(type === 'users') {
				this.fetchUserData(tags).then(data => {
					resolve(data);
				});
			}
		} else {
			resolve(null);
		}
	});
}

module.exports = new Recommender();