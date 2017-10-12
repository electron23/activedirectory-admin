var express = require('express');
var router = express.Router();

var auth = require('../controllers/auth.controller');

router.post('/signIn', auth.signIn);
router.post('/signOut', auth.signOut);

module.exports = router;