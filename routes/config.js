var router = require('express').Router();

var config = require('../controllers/config.controller');

router.get('/list/:offset/:limit/:sortkey/:sortorder', config.list);
router.get('/search/:offset/:limit/:sortkey/:sortorder/:search', config.search);
router.post('/create', config.create);
router.get('/details/:id', config.details);
router.post('/update/:id', config.update);
router.post('/remove/:id', config.remove);

module.exports = router;