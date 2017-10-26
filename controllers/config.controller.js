var bcrypt = require('bcrypt');
var Sequelize = require('sequelize');

var env = process.env.NODE_ENV || 'development';
var config = require('../config/' + env);

var models = require('../db/models');
var logger = require('../utils/logger');

var list = async(req, res, next) => {

    try {

        if (!req.params.offset || !req.params.limit || !req.params.sortkey || !req.params.sortorder)
            throw new Error('No offset and/or limit specified in route.');

        var count = await models.Config.count();

        var configs = await models.Config.findAll({ offset: req.params.offset, limit: req.params.limit, order: [
                [req.params.sortkey, req.params.sortorder]
            ] });

        logger.debug(`API: Found "${configs.length}" configs in database.`);

        res
            .status(200)
            .json({ code: 200, message: `Found "${req.params.offset}" to "${req.params.limit}" from "${count}" configs in database.`, data: { count: count, configs: configs } });

    }
    catch (err) {

        logger.error(`API: ${err.message}`);

        res.status(404).json({ code: 404, message: err.message, data: {} });

    }

};

var search = async(req, res, next) => {

    try {

        if (!req.params.offset || !req.params.limit || !req.params.sortkey || !req.params.sortorder || !req.params.search)
            throw new Error('No offset and/or limit specified in route.');

        var count = await models.Config.count({
            where: {
                [Sequelize.Op.or]: [
                    { key: {
                            [Sequelize.Op.like]: '%' + req.params.search + '%' } },
                    { value: {
                            [Sequelize.Op.like]: '%' + req.params.search + '%' } },
                ]
            }
        });

        var configs = await models.Config.findAll({
            where: {
                [Sequelize.Op.or]: [
                    { key: {
                            [Sequelize.Op.like]: '%' + req.params.search + '%' } },
                    { value: {
                            [Sequelize.Op.like]: '%' + req.params.search + '%' } },
                ]
            },
            offset: req.params.offset,
            limit: req.params.limit,
            order: [
                [req.params.sortkey, req.params.sortorder]
            ]
        });

        logger.debug(`API: Found "${configs.length}" configs in database.`);

        res
            .status(200)
            .json({ code: 200, message: `Found "${req.params.offset}" to "${req.params.limit}" from "${count}" configs in database.`, data: { count: count, configs: configs } });

    }
    catch (err) {

        logger.error(`API: ${err.message}`);

        res.status(404).json({ code: 404, message: err.message, data: {} });

    }

};

var create = async(req, res, next) => {

    try {

        var config = await models.Config.build(req.body);

        config = await config.save();

        logger.debug(`New Config with id: "${config.id}" saved to database.`);

        res
            .status(200)
            .json({ code: 200, message: `New Config with id: "${config.id}" saved to database.`, data: config });

    }
    catch (err) {

        logger.error(`API: ${err.message}`);

        res.status(404).json({ code: 404, message: err.message, data: {} });

    }

};

var details = async(req, res, next) => {

    try {

        if (!req.params.id)
            throw new Error('No config id specified in route.');

        var config = await models.Config.findOne({ where: { id: req.params.id }, raw: true });

        if (config.length <= 0)
            throw new Error(`No config with id: "${req.params.id}" in database.`);

        logger.debug(`Config with id: "${req.params.id}" found in database.`);

        res
            .status(200)
            .json({ code: 200, message: `Account with id: "${req.params.id}" found in database.`, data: config });

    }
    catch (err) {

        logger.error(`API: ${err.message}`);

        res.status(404).json({ code: 404, message: err.message, data: {} });

    }

};

var update = async(req, res, next) => {

    try {

        if (!req.params.id)
            throw new Error('No config id specified in route.');

        var config = await models.Config.findOne({ where: { id: req.params.id } });

        config = await config.update(req.body);

        logger.debug(`Config with id: "${req.params.id}" updated in database.`);

        res
            .status(200)
            .json({ code: 200, message: `Config with id: "${req.params.id}" updated in database.`, data: config });

    }
    catch (err) {

        logger.error(`API: ${err.message}`);

        res.status(404).json({ code: 404, message: err.message, data: {} });

    }

};

var remove = async(req, res, next) => {

    try {

        if (!req.params.id)
            throw new Error('No config id specified in route.');

        var config = await models.Config.findOne({ where: { id: req.params.id } });

        config = await config.destroy({ force: true });

        logger.debug(`Config with id: "${req.params.id}" deleted from database.`);

        res
            .status(200)
            .json({ code: 200, message: `Config with id: "${req.params.id}" deleted from database.`, data: [] });

    }
    catch (err) {

        logger.error(`API: ${err.message}`);

        res.status(404).json({ code: 404, message: err.message, data: {} });

    }

};


module.exports = {
    list: list,
    search: search,
    create: create,
    details: details,
    update: update,
    remove: remove
};
