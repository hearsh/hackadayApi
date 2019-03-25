const express = require('express');
const config = require('../components/credentials/index.js');
const router = express.Router();
const fetch = require('node-fetch');

/* Get Data */
const getData = (page) => {
	return new Promise((resolve, reject) => {
		let url = `http://api.hackaday.io/v1/projects?page=${page}&per_page=10&api_key=${config.apiKey}`;
		fetch(url)
	    .then(response => response.json())
	    .then(data => {
	    	resolve(data);
	    });
	})
}

/* Generate page content */
const makeHtml = (data) => {
	let output = `<div>`;
	data.forEach(data => {
		let card = `<div class'card'>`;
		card = card + `<h1>${data.name}</h1>`;
		card = card + `<p>${data.summary}</p>`;
		card = card + `</div>`;
		output = output + card;
	});
	output = output + `</div>`;
	return output;
}


/* GET home page. */
router.get('/', function(req, res, next) {
	getData(1).then(data => {
		res.render('index', { app: data.projects });
	});
});

module.exports = router;
