
var bcrypt = require('bcryptjs');
const saltRounds = 10;
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
  },
  beforeCreate: function (appcredentials, callback) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(appcredentials.password, salt, function (err, hash) {
        if (err) {
          console.log(err);
          return callback(err);
        } else {
          appcredentials.password = hash;
          return callback();
        }
      });
    });
  }

};
