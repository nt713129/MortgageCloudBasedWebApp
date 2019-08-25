/**
 * Insuranceinfo.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

 //Table Structure of Insurance Details  

module.exports = {

  attributes: {
    user_id: {
      type: 'number',
      required: true,
    },
    name:{
      type:'string',
      required :true,
    },
    mortgage_num:{
      type:'number',
      required :true,
    },  
    mlsid:{
      type:'number',
      required :true,
    },
    appraiser_amount:{
      type:'number',
      required :true,
    },
    insurance_value:{
      type:'number',
      required :true,
    },
    deduction_value:{
      type:'number',
      required :true,
    },
    insurance_status:{
      type:'string',
      required :true,
    }
  }
};


