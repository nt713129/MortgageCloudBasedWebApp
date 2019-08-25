/**
 * Broker_07.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
    
    attributes: {
      name: {
        type:'string',
        required :true,
      },
      msid : {
        type:'number',
       required :true,
      },
      mortnum : {
       type:'number',
      required :true,
     },
     appraiseramount : {
        type:'number',
       required :true,
      }
     
    },
  };
  
  