var express = require('express');
var router = express.Router();

const UserApi = require('../components/DataAccess/Userdata/index.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
	console.log(res.params.id);
  res.send('respond with a resource');
});

module.exports = router;
