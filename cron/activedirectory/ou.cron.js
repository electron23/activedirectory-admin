const axios = require('axios');

const models = require('../../db/models');
const config = require('../../config');

let getOUs = async () => {

    axios.defaults.headers.common['x-access-token'] = config.PS.ACCESS_TOKEN;

    const response = await axios.post(config.PS.BASE_URL + '/ou/get', { params: '' });

    if (response.status === 200) {

        const ous = response.data; 

        if (ous.length > 0) {
        
            ous.forEach( async (ou) => {
                await writeToOusDatabase(ou);
            });
            
            return ous.length;
                
        }

    }

};

const writeToOusDatabase = async (item) => {

    try {
        
        const dbOu = await models.Ou.findOne({ where: { ObjectGUID: item.ObjectGUID } });
        
        if(dbOu) {
            await dbOu.update(item);
        } else {
            await models.Ou.create(item);
        }
        
        return true;
        
    } catch (error) {
        return error;
    } 

};

module.exports = {
    getOUs
};
