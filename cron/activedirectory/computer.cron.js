const axios = require('axios');
const Async = require('async');

const models = require('../../db/models');
const config = require('../../config');

let getComputers = async() => {

    axios.defaults.headers.common['x-access-token'] = config.PS.ACCESS_TOKEN;

    const response = await axios.post(config.PS.BASE_URL + '/computer/get', { params: '-Filter *' });

    if (response.status === 200) {

        const computers = response.data;

        if (computers.length > 0) {

            computers.forEach(async(computer) => {

                await writeToComputersDatabase(computer);

            });

            return computers.length;

        }

    }

};

const writeToComputersDatabase = async(item) => {

    try {

        const dbComputer = await models.Computer.findOne({ where: { ObjectGUID: item.ObjectGUID } });

        if (dbComputer) {
            await dbComputer.update({
                Name: item.Name,
                ObjectClass: item.ObjectClass,
                DistinguishedName: item.DistinguishedName,
                ObjectGUID: item.ObjectGUID,
                DNSHostName: item.DNSHostName,
                Enabled: item.Enabled,
                SID: item.SID.Value,
                UserPrincipalName: item.UserPrincipalName
            });
        }
        else {
            await models.Computer.create({
                Name: item.Name,
                ObjectClass: item.ObjectClass,
                DistinguishedName: item.DistinguishedName,
                ObjectGUID: item.ObjectGUID,
                DNSHostName: item.DNSHostName,
                Enabled: item.Enabled,
                SID: item.SID.Value,
                UserPrincipalName: item.UserPrincipalName
            });
        }

        return true;

    }
    catch (error) {
        return error;
    }

};

module.exports = {
    getComputers
};
