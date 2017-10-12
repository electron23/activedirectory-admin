const CronJob = require('cron').CronJob;

const env = process.env.NODE_ENV || 'development';
const config = require('../config/' + env);
const logger = require('../utils/logger');


const ouCron = require('./activedirectory/ou.cron');
const computerCron = require('./activedirectory/computer.cron');
const accountCron = require('./activedirectory/account.cron');

module.exports.startActiveDirectoryJobs = () => {

    // Active Directory Organisation Unit Cron Job
    new CronJob(config.CRON.OU, async() => {

        try {

            const ousCount = await ouCron.getOUs();

            logger.info(`CronJob: ${ousCount} ous imported.`);


        }
        catch (error) {

            logger.error(`CronJob: ${JSON.stringify(error)}`);

        }

    }, null, true, config.TIMEZONE);

    // Active Directory Computer Cron Job
    new CronJob(config.CRON.COMPUTER, async() => {

        try {

            const computersCount = await computerCron.getComputers();

            logger.info(`CronJob: ${computersCount} computer imported.`);


        }
        catch (error) {

            logger.error(`CronJob: ${JSON.stringify(error)}`);

        }

    }, null, true, config.TIMEZONE);

    // Active Directory Account Cron Job
    new CronJob(config.CRON.ACCOUNT, async() => {

        try {

            const accountsCount = await accountCron.getAccounts();

            logger.info(`CronJob: ${accountsCount} accounts imported.`);


        }
        catch (error) {

            logger.error(`CronJob: ${JSON.stringify(error)}`);

        }

    }, null, true, config.TIMEZONE);

};
