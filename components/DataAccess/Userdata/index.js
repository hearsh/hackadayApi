function Userdata() {
	this.users = null;
	this.userDic = {};
}

Userdata.prototype.setUserData = function (data){
	this.users = data;
	for(let i = 0; i < this.users; i++) {
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

module.exports = new Userdata();