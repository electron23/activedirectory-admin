var router = require('express').Router();

var account = require('../controllers/account.controller');

router.get('/list/:offset/:limit/:sortkey/:sortorder', account.list);
router.get('/report/deactivated', account.reportDeactivatedAccounts);
router.get('/search/:offset/:limit/:sortkey/:sortorder/:search', account.search);
router.post('/create', account.create);
router.get('/details/:id', account.details);
router.post('/update/:id', account.update);
router.delete('/remove/:id', account.remove);

module.exports = router;