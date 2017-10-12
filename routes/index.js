var express = require('express');
var router = express.Router();

var checkAuth = require('../controllers/auth.controller').checkAuth;
var auth = require('./auth');
var logger = require('../utils/logger');

router.use('/auth', auth);

router.use(checkAuth, (req, res, next) => {
    logger.debug(`WEB: Route "${req.method}":"${req.path}" wurde mit folgenden Parametern aufgerufen: \n${JSON.stringify(req.body, null, '\t')}`);
    next();
});

router.get('/', (req, res, next) => {
  res.status(200).json({code: 200, message: 'Active Directory Admin API is listening.', data: {}});
});



module.exports = router;
