/**
 * Broker_07.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
  
 //Table Structure of Mortgage Form  

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
    address: {
      type: 'string',
      required: true,
    },
    city: {
      type: 'string',
      required: true,
    },
    province: {
      type: 'string',
      required: true,
    },
    phonenumber: {
      type: 'string',
      required: true,
    },
    comname: {
      type: 'string',
      required: true,
    },
    comadd: {
      type: 'string',
      required: true,
    },
    mortgage_num: {
      type: 'number',
      required: true,
    },
    employer_info_status: {
      type: 'string',
      required: true,
    },
    msid: {
      type: 'number',
      required: true,
    },
    mortvalue: {
      type: 'number',
      required: true,
    }
  },
};

