const MaxHeap = require(`../MaxHeap/index.js`);

function Recommender() {
	this.data = {
		'tags': null,
		'users': null,
	};
}

Recommender.prototype.setRecommender = function(tags, user) {
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
		this.data.users[user] = {
			'score': 1,
			'count': 1,
		};
		this.data['userLength'] = 1;
		return;
	}
	this.addTags(tags);
	this.addUser(user);
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

Recommender.prototype.addUser = function(user) {
	this.data.userLength += 1;
	if(this.data.users[user] === undefined) {
		this.data.users[user] = {
			'score': (1 / this.data.userLength),
			'count': 1,
		}
	} else {
		this.data.users[user] = {
			'score': ((1 + this.data.users[user].count) / this.data.userLength),
			'count': (1 + this.data.users[user].count),
		}
	}
	return;
}

Recommender.prototype.getRecommendation = function() {
	for(key in this.data.tags) {
		MaxHeap.addToHeap({
			'tag': key,
			'score': this.data.tags[key].score,
		});
	}
	return MaxHeap.getHeap();
}

Recommender.prototype.fetchRecommendation = function() {
	let tags = this.getRecommendation()
	console.log(tags);
}

module.exports = new Recommender();