var bcrypt = require('bcrypt');

var env = process.env.NODE_ENV || 'development';
var config = require('./config/' + env);
var logger = require('./utils/logger');
var models = require('./db/models');
var db = require('./db/setup');

module.exports.now = () => {
    
    if(config.SETUP) {
     
        db.up();
        
        var dbUser = models.Account.build({
          firstname: 'Admin',
          lastname: '',
          email: 'admin@niite.de',
          password: bcrypt.hashSync('test', 10),
          isActive: true
        });
        
        dbUser.save().then(() => {
          logger.info('Initial User saved to db!');
        });
        
    }
    
};