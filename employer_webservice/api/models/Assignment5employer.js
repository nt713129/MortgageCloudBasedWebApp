/**
 * Assignment5employer.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
var bcrypt = require('bcryptjs');
const saltRounds=10;
module.exports = {
// Table Structure of employees details 
  attributes: {

    employee_id : {
      type:'number',
      required :true,
    },
    password : {
      type:'string',
      required :true,
    },
    employee_name : {
      type:'string',
      required :true,
    },
    employee_salary : {
      type:'number',
      required :true,
    },
    employee_experience : {
      type:'number',
      required :true,
    }
  },
  beforeCreate: function (employerlogin, callback) {
    // Hashing the employees credentials during login
    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(employerlogin.password, salt, function (err, hash) {
        if (err) {
          console.log(err);
          return callback(err);
        } else {
          employerlogin.password = hash;
          return callback();
        }
      });
    });
  }
};

