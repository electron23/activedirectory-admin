var router = require('express').Router();

var profile = require('../controllers/profile.controller');

router.get('/details/:id', profile.details);
router.post('/update/:id', profile.update);
router.post('/reset-password/:id', profile.resetPassword);

module.exports = router;