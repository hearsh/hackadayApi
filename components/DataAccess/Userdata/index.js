/*
Helper functions to get user data.
*/
const axios = require('axios');
const config = require(`../../Credentials/index.js`);

function Userdata() {
	this.users = null;
	this.userDic = {};
}

Userdata.prototype.setUserData = function (data){
	this.users = data;
	for(let i = 0; i < this.users.length; i++) {
		this.userDic[this.users[i].id] = this.users[i];
	}
}

Userdata.prototype.getUserName = function (id) {
	if(this.userDic[id] !== undefined) {
		return this.userDic[id].screen_name;
	} else {
		for(let i = 0 ; i < this.users.length; i++) {
			if(this.users[i].id === id) {
				return this.users[i].screen_name;
			}
		}
	}
}

Userdata.prototype.getUserData = function (id) {
	return new Promise((resolve, reject) => {
		if(this.userDic[id] !== undefined) {
			resolve(this.userDic[id]);
		} else if(this.users !== null) {
			for(let i = 0 ; i < this.users.length; i++) {
				if(this.users[i].id === id) {
					resolve(this.users[i]);
				}
			}
		} else {
			let url = `http://api.hackaday.io/v1/users/${id}?api_key=${config.apiKey}`;
			axios.get(url)
		  .then(data => {
		  	console.log(data.data);
		  	resolve(data.data);
		  });
		}
	});
}

Userdata.prototype.getAllUsers = function () {
	return this.userDic;
}

module.exports = new Userdata();