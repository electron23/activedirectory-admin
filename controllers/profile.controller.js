var bcrypt = require('bcrypt');

var env = process.env.NODE_ENV || 'development';
var config = require('../config/' + env);

var models = require('../db/models');
var logger = require('../utils/logger');


var details = async (req, res, next) => {
    
    try {

        if (!req.params.id)
            throw new Error('No profile id specified in route.');

        var profile = await models.Account.findOne({ where: { id: req.params.id }, raw: true });

        if (profile.length <= 0)
            throw new Error(`No profile with id: "${req.params.id}" in database.`);

        logger.debug(`Profile with id: "${req.params.id}" found in database.`);

        res
            .status(200)
            .json({ code: 200, message: `Profile with id: "${req.params.id}" found in database.`, data: profile });

    }
    catch (err) {

        logger.error(`API: ${err.message}`);

        res.status(404).json({ code: 404, message: err.message, data: {} });

    }
    
};

var update = async (req, res, next) => {
    
    try {

        if (!req.params.id)
            throw new Error('No profile id specified in route.');

        if (req.body.password)
            delete req.body.password;

        var profile = await models.Account.findOne({ where: { id: req.params.id } });

        profile = await profile.update(req.body);

        logger.debug(`Profile with id: "${req.params.id}" updated in database.`);

        res
            .status(200)
            .json({ code: 200, message: `Profile with id: "${req.params.id}" updated in database.`, data: profile });

    }
    catch (err) {

        logger.error(`API: ${err.message}`);

        res.status(404).json({ code: 404, message: err.message, data: {} });

    }
    
};

var resetPassword = async (req, res, next) => {
    
    try {

        if (!req.params.id)
            throw new Error('No profile id specified in route.');

        if (req.body.newpassword !== req.body.confirmedpassword)
            throw new Error('Confirmed password not equal new password.');

        var profile = await models.Account.findOne({ where: { id: req.params.id } });

        if(!bcrypt.compareSync(req.body.oldpassword, profile.password))
            throw new Error('Old password is not correct.');

        profile = await profile.update({password: bcrypt.hashSync(req.body.newpassword, config.SALT_FACTOR)});

        logger.debug(`Password from profile with id: "${req.params.id}" updated in database.`);

        res
            .status(200)
            .json({ code: 200, message: `Password from profile with id: "${req.params.id}" updated in database.`, data: profile });

    }
    catch (err) {

        logger.error(`API: ${err.message}`);

        res.status(404).json({ code: 404, message: err.message, data: {} });

    }
    
};

module.exports = {
    details: details,
    update: update,
    resetPassword: resetPassword
};