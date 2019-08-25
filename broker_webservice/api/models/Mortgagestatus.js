/**
 * Insuranceinfo.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

 //Table Structure of Mortgage Status  

module.exports = {

    attributes: {
        user_id: {
            type: 'number',
            required: true,
        },
        name: {
            type: 'string',
            required: true,
        },
        mortgage_num: {
            type: 'number',
            required: true,
        },
        mlsid: {
            type: 'number',
            required: true,
        },
        employer_info_status: {
            type: 'string',
            required: true,
        },
        insurance_status: {
            type: 'string',
            required: true,
        },
        mortgage_status: {
            type: 'string',
            required: true,
        }
    }
};


