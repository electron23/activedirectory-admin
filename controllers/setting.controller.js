var env = process.env.NODE_ENV || 'development';
var config = require('../config/' + env);

var models = require('../db/models');
var logger = require('../utils/logger');

var list = async(req, res, next) => {

    try {

        var settings = await models.Setting.findAll();

        logger.debug(`API: Found "${settings.length}" settings in database.`);

        res
            .status(200)
            .json({ code: 200, message: `Found "${settings.length}" account in database.`, data: settings });

    }
    catch (err) {

        logger.error(`API: ${err.message}`);

        res.status(404).json({ code: 404, message: err.message, data: {} });

    }

};

var create = async(req, res, next) => {

    try {
        
        var setting = await models.Setting.build(req.body);

        setting = await setting.save();

        logger.debug(`New setting with id: "${setting.id}" saved to database.`);

        res
            .status(200)
            .json({ code: 200, message: `New setting with id: "${setting.id}" saved to database.`, data: setting });

    }
    catch (err) {

        logger.error(`API: ${err.message}`);

        res.status(404).json({ code: 404, message: err.message, data: {} });

    }

};

var details = async(req, res, next) => {

    try {

        if (!req.params.id)
            throw new Error('No setting id specified in route.');

        var setting = await models.Setting.findOne({ where: { id: req.params.id }, raw: true });

        if (setting.length <= 0)
            throw new Error(`No setting with id: "${req.params.id}" in database.`);

        logger.debug(`Setting with id: "${req.params.id}" found in database.`);

        res
            .status(200)
            .json({ code: 200, message: `Setting with id: "${req.params.id}" found in database.`, data: setting });

    }
    catch (err) {

        logger.error(`API: ${err.message}`);

        res.status(404).json({ code: 404, message: err.message, data: {} });

    }

};

var update = async(req, res, next) => {

    try {

        if (!req.params.id)
            throw new Error('No setting id specified in route.');

        var setting = await models.Setting.findOne({ where: { id: req.params.id } });

        setting = await setting.update(req.body);

        logger.debug(`Setting with id: "${req.params.id}" updated in database.`);

        res
            .status(200)
            .json({ code: 200, message: `Setting with id: "${req.params.id}" updated in database.`, data: setting });

    }
    catch (err) {

        logger.error(`API: ${err.message}`);

        res.status(404).json({ code: 404, message: err.message, data: {} });

    }

};

var remove = async(req, res, next) => {

     try {

        if (!req.params.id)
            throw new Error('No account id specified in route.');

        var setting = await models.Setting.findOne({ where: { id: req.params.id } });

        setting = await setting.destroy({ force: true });

        logger.debug(`Setting with id: "${req.params.id}" deleted from database.`);

        res
            .status(200)
            .json({ code: 200, message: `Setting with id: "${req.params.id}" deleted from database.`, data: [] });

    }
    catch (err) {

        logger.error(`API: ${err.message}`);

        res.status(404).json({ code: 404, message: err.message, data: {} });

    }

};


module.exports = {
    list: list,
    create: create,
    details: details,
    update: update,
    remove: remove
};
