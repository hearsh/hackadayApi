const config = require(`../../Credentials/index.js`);
const fetch = require('node-fetch');

function ProjectData() {
	this.data = null;
	this.page = null;
}

ProjectData.prototype.getData = function(page) {
	return new Promise((resolve, reject) => {
		if(page === this.page && this.data) {
			resolve(this.data);
		} else {
			let url = `http://api.hackaday.io/v1/projects?page=${page}&per_page=10&api_key=${config.apiKey}`;
			fetch(url)
		    .then(response => response.json())
		    .then(data => {
		    	this.data = data;
		    	this.page = page;
		    	resolve(data);
		    });
		}
	});
}

module.exports = new ProjectData();