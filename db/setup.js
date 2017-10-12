var Umzug = require('umzug');
var sequelize = require('./models').sequelize;

module.exports.up = function() {

    var umzug = new Umzug({

        storage: 'sequelize',

        storageOptions: {
            sequelize: sequelize,
        },

        migrations: {
            params: [sequelize.getQueryInterface(), sequelize.constructor, function() {
                throw new Error('Migration tried to use old style "done" callback. Please upgrade to "umzug" and return a promise instead.');
            }],
            path: __dirname + '/migrate',
            pattern: /\.js$/
        }

    });

    umzug.up().then(function() {
        console.log('Migration complete!');
    });
};
