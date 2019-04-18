const MaxHeap = require(`../MaxHeap/index.js`);
const config = require(`../../Credentials/index.js`);
const fetch = require('node-fetch');

function Recommender() {
	this.data = {
		'tags': null,
		'users': null,
	};
}

Recommender.prototype.setRecommender = function(tags, users) {
	if(this.data.tags === null) {
		this.data.tags = {};
		for(let i = 0; i < tags.length; i++) {
			this.data.tags[tags[i]] = {
				'score': (1 / tags.length),
				'count': 1,
			};
		}
		this.data['tagLength'] = tags.length;
		return;
	}
	if(this.data.users === null) {
		this.data.users = {};
		if(users !== null) {
			for(let i = 0; i < users.length; i++) {
				this.data.users[users[i]] = {
					'score': (1 / users.length),
					'count': 1,
				};
			}
			this.data['userLength'] = users.length;
		}
		return;
	}
	this.addTags(tags);
	this.addUsers(users);
}

Recommender.prototype.addTags = function(tags) {
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
	return;
}

Recommender.prototype.addUsers = function(users) {
	if(users !== null) {
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
	return;
}

Recommender.prototype.getRecommendation = function(type) {
	MaxHeap.clearHeap();
	if(type === 'projects') {
		if(this.data.tags === null) {
			return null;
		}
		for(key in this.data.tags) {
			MaxHeap.addToHeap({
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
			MaxHeap.addToHeap({
				'id': key,
				'score': this.data.users[key].score,
			});
		}
	}
	return MaxHeap.getHeap();
}

Recommender.prototype.fetchRecommendation = function(type) {
	return new Promise((resolve, reject) => {
		let tags = this.getRecommendation(type);
		if(tags) {
			let tagTxt = '';
			for(let i = 0; i < tags.length; i++) {
				tagTxt = tagTxt + " " + tags[i].id;
			}
			if(type === 'projects') {
				if(tagTxt === '') {
					resolve(null);
				}
				let url = `http://api.hackaday.io/v1/projects/search?search_term=${tagTxt}&per_page=3&api_key=${config.apiKey}`;
				fetch(url)
			  .then(response => response.json())
			  .then(data => {
			  	let finalData = {};
			  	if(data.projects.length) {
			  		for(let i = 0; i < data.projects.length; i++) {
			  			if(data.projects[i].name !== undefined) {
			  				finalData[data.projects[i].id] = {
					  			'name': data.projects[i].name,
					  			'link': `projects/${data.projects[i].id}`,
					  		};
			  			}
				  	}
			  	}
			  	resolve(finalData);
			  });
			}
			if(type === 'users') {
				if(tagTxt === '') {
					resolve(null);
				}
				let url = `http://api.hackaday.io/v1/users/search?tag=${tagTxt}&api_key=${config.apiKey}`;
				fetch(url)
			  .then(response => response.json())
			  .then(data => {
			  	let finalData = {};
			  	if(data.users && data.users.length) {
			  		if(data.users.length < 3) {
			  			for(let i = 0; i < data.projects.length; i++) {
					  		finalData[data.projects[i].id] = {
					  			'name': data.users[i].username,
					  			'link': `${data.users[i].url}`,
					  		};
					  	}
			  		} else {
			  			for(let i = 0; i < 3; i++) {
					  		finalData[data.projects[i].id] = {
					  			'name': data.users[i].username,
					  			'link': `${data.users[i].url}`,
					  		};
					  	}
			  		}
			  	}
			  	resolve(finalData);
				});
			}
		} else {
			resolve(null);
		}
	});
}

module.exports = new Recommender();