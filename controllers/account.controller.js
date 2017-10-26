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

        var count = await models.Account.count();

        var accounts = await models.Account.findAll({ offset: req.params.offset, limit: req.params.limit, order: [
                [req.params.sortkey, req.params.sortorder]
            ] });

        logger.debug(`API: Found "${accounts.length}" accounts in database.`);

        res
            .status(200)
            .json({ code: 200, message: `Found "${req.params.offset}" to "${req.params.limit}" from "${count}" account in database.`, data: { count: count, accounts: accounts } });

    }
    catch (err) {

        logger.error(`API: ${err.message}`);

        res.status(404).json({ code: 404, message: err.message, data: {} });

    }

};

var reportDeactivatedAccounts = async(req, res, next) => {

    try {

        var count = await models.Account.count();
        
        var active = await models.Account.count({ where: { isActive: true }});
        
        var inactive = (count - active);

        logger.debug(`API: Accounts active: "${active}", inactive: "${inactive}", summary: "${count}" in database.`);

        res
            .status(200)
            .json({ code: 200, message: `API: Accounts active: "${active}", inactive: "${inactive}", summary: "${count}" in database.`, data: [ { name:"Active", value: active }, { name: "Inactive", value: inactive}]});

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

        var count = await models.Account.count({
            where: {
                [Sequelize.Op.or]: [
                    { firstname: {
                            [Sequelize.Op.like]: '%' + req.params.search + '%' } },
                    { lastname: {
                            [Sequelize.Op.like]: '%' + req.params.search + '%' } },
                    { email: {
                            [Sequelize.Op.like]: '%' + req.params.search + '%' } },
                ]
            }
        });

        var accounts = await models.Account.findAll({
            where: {
                [Sequelize.Op.or]: [
                    { firstname: {
                            [Sequelize.Op.like]: '%' + req.params.search + '%' } },
                    { lastname: {
                            [Sequelize.Op.like]: '%' + req.params.search + '%' } },
                    { email: {
                            [Sequelize.Op.like]: '%' + req.params.search + '%' } },
                ]
            },
            offset: req.params.offset,
            limit: req.params.limit,
            order: [
                [req.params.sortkey, req.params.sortorder]
            ]
        });

        logger.debug(`API: Found "${accounts.length}" account in database.`);

        res
            .status(200)
            .json({ code: 200, message: `Found "${req.params.offset}" to "${req.params.limit}" from "${count}" account in database.`, data: { count: count, accounts: accounts } });

    }
    catch (err) {

        logger.error(`API: ${err.message}`);

        res.status(404).json({ code: 404, message: err.message, data: {} });

    }

};

var create = async(req, res, next) => {

    try {

        if (req.body.password)
            req.body.password = bcrypt.hashSync(req.body.password, config.SALT_FACTOR);
        else
            req.body.password = bcrypt.hashSync(config.DEFAULT_ACCOUNT_PASSWORD, config.SALT_FACTOR);

        var account = await models.Account.build(req.body);

        account = await account.save();

        logger.debug(`New Account with id: "${account.id}" saved to database.`);

        res
            .status(200)
            .json({ code: 200, message: `New Account with id: "${account.id}" saved to database.`, data: account });

    }
    catch (err) {

        logger.error(`API: ${err.message}`);

        res.status(404).json({ code: 404, message: err.message, data: {} });

    }

};

var details = async(req, res, next) => {

    try {

        if (!req.params.id)
            throw new Error('No account id specified in route.');

        var account = await models.Account.findOne({ where: { id: req.params.id }, raw: true });

        if (account.length <= 0)
            throw new Error(`No account with id: "${req.params.id}" in database.`);

        logger.debug(`Account with id: "${req.params.id}" found in database.`);

        res
            .status(200)
            .json({ code: 200, message: `Account with id: "${req.params.id}" found in database.`, data: account });

    }
    catch (err) {

        logger.error(`API: ${err.message}`);

        res.status(404).json({ code: 404, message: err.message, data: {} });

    }

};

var update = async(req, res, next) => {

    try {

        if (!req.params.id)
            throw new Error('No account id specified in route.');

        if (req.body.password)
            req.body.password = bcrypt.hashSync(req.body.password, config.SALT_FACTOR);

        var account = await models.Account.findOne({ where: { id: req.params.id } });

        account = await account.update(req.body);

        logger.debug(`Account with id: "${req.params.id}" updated in database.`);

        res
            .status(200)
            .json({ code: 200, message: `Account with id: "${req.params.id}" updated in database.`, data: account });

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

        var account = await models.Account.findOne({ where: { id: req.params.id } });

        account = await account.destroy({ force: true });

        logger.debug(`Account with id: "${req.params.id}" deleted from database.`);

        res
            .status(200)
            .json({ code: 200, message: `Account with id: "${req.params.id}" deleted from database.`, data: [] });

    }
    catch (err) {

        logger.error(`API: ${err.message}`);

        res.status(404).json({ code: 404, message: err.message, data: {} });

    }

};


module.exports = {
    list: list,
    reportDeactivatedAccounts: reportDeactivatedAccounts,
    search: search,
    create: create,
    details: details,
    update: update,
    remove: remove
};
