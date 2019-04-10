var express = require('express');
var router = express.Router();

const UserName = require(`../components/DataAccess/Userdata/index.js`);

/* Send user data. */
router.get('/', function(req, res, next) {
	let userData = UserName.getAllUsers();
	res.status(200);
	res.json({
		'userData': userData,
	});
});

module.exports = router;
