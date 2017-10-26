var express = require('express');
var router = express.Router();

var auth = require('../controllers/auth.controller');

router.post('/sign-in', auth.signIn);
router.post('/sign-out', auth.signOut);

module.exports = router;