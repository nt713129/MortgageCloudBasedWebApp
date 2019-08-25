/**
 * Brokercredentials.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
 //Table Structure of Login to MBR portal

var bcrypt = require('bcryptjs');
const saltRounds=10;
module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true,
      unique: true,
    },
    password: {
      type: 'string',
      required: true,
    },
    mailid: {
      type: 'string',
      required: true,
    }
  },
  //For Hashing the login password before storing it in DB
  beforeCreate: function (brokerlogincredentials, callback) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(brokerlogincredentials.password, salt, function (err, hash) {
        if (err) {
          console.log(err);
          return callback(err);
        } else {
          brokerlogincredentials.password = hash;
          return callback();
        }
      });
    });
  }
};

