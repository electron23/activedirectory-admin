var _ = require('lodash');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/' + env);

var models = require('../db/models');
var logger = require('../utils/logger');

var signIn = async(req, res, next) => {
    
    var credentials = _.pick(req.body, ['email', 'password']);
    
    try {
    
        if(!credentials.email || !credentials.password)
            throw new Error('No email or password given.');
        
        var account = await models.Account.findOne({ where: { email: credentials.email }, raw: true});
            
        if(!account)
            throw new Error('Account not found in database.');
            
        if(account.isActive !== 1)
            throw new Error('Account is not active.');
        
        if(!bcrypt.compareSync(credentials.password, account.password))
            throw new Error('Password is not correct.');
        
        var token = jwt.sign(account, config.JWT.SECRET, { expiresIn: config.JWT.EXPIRES_IN });
        
        await models.Token.destroy({ where: { accountId: account.id }});
        var dbToken = await models.Token.build({accountId: account.id, access: 'auth', token: token});
        await dbToken.save();
        
        account.token = dbToken;
        
        logger.info(`AUTH: Account with email: "${account.email}" successfully logged in.`);
        
        res
            .status(200)
            .header('x-auth', token)
            .json({code: 200, message: 'Authentication successfully.', data: account});
        
    } catch (err) {
        
        logger.error(`AUTH: ${err.message}`);
        
        res.status(401).json({code: 401, message: err.message, data: {}});
        
    }
    
};

var checkAuth = async (req, res, next) => {
    
    var token = req.header('x-auth');
    
    try {
        
        if(!token)
            throw new Error('Route is secured and no token passed.');
        
        var dbToken = await models.Token.findOne({ where: { token: token }, raw: true});
        
        if(!dbToken)
            throw new Error('Token is not valid.');
            
        var account = await models.Account.findOne({ where: { id: dbToken.accountId }, raw: true });
        
        if(!account)
            throw new Error('Account does not exist in db.');
        
        if(account.isActive !== 1)
            throw new Error('Account is not active.');
        
        req.user = account;
        
        next();
        
    } catch (err) {
        
        logger.error(`AUTH: ${err.message}`);
        
        res.status(401).json({code: 401, message: err.message, data: {}});
        
    }
    
};

var signOut = async (req, res, next) => {
    
};

module.exports = {
    signIn: signIn,
    checkAuth: checkAuth,
    signOut: signOut
};