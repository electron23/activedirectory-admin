const axios = require('axios');

const models = require('../../db/models');
const config = require('../../config');

let getAccounts = async() => {

    axios.defaults.headers.common['x-access-token'] = config.PS.ACCESS_TOKEN;

    const response = await axios.post(config.PS.BASE_URL + '/account/get', { params: '-Filter *' });

    if (response.status === 200) {

        const accounts = response.data; 

        if (accounts.length > 0) {
        
            accounts.forEach( async (account) => {
                await writeToAccountsDatabase(account);
            });
            
            return accounts.length;
                
        }

    }

};

const writeToAccountsDatabase = async (item) => {

    try {
        
        let saved = null;
        
        const dbAccount = await models.Account.findOne({ where: { ObjectGUID: item.ObjectGUID } });
        
        if(dbAccount) {
            saved = await dbAccount.update({
                GivenName: item.GivenName,
                Surname: item.Surname,
                UserPrincipalName: item.UserPrincipalName,
                Enabled: item.Enabled,
                SamAccountName: item.SamAccountName,
                SID: item.SID.Value,
                DistinguishedName: item.DistinguishedName,
                Name: item.Name,
                ObjectClass: item.ObjectClass,
                ObjectGUID: item.ObjectGUID
            });
        } else {
            saved = await models.Account.create({
                GivenName: item.GivenName,
                Surname: item.Surname,
                UserPrincipalName: item.UserPrincipalName,
                Enabled: item.Enabled,
                SamAccountName: item.SamAccountName,
                SID: item.SID.Value,
                DistinguishedName: item.DistinguishedName,
                Name: item.Name,
                ObjectClass: item.ObjectClass,
                ObjectGUID: item.ObjectGUID
            });
        }
        
        return saved;
        
    } catch (error) {
        return error;
    } 

};

module.exports = {
    getAccounts
};
