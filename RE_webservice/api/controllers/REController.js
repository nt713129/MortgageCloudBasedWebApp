/**
 * REController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var bcrypt = require('bcryptjs');
const saltRounds = 10;
module.exports = {

  re_blazers07: function (req, res) {
    var name = req.query['name'];
    var msid = req.query['msid'];
    var mortnum = req.query['mortnum'];
    var isEvaluated = req.query['isEvaluated'];
    sails.log('The information that the user has entered in the RE portal is : name : ',name,' MslID : ',msid,' Mortgage Number :  ',mortnum)

    if (name.length <= 0 && msid.length <= 0 && mortnum.length) {
      return res.json({ err: 'Enter the details' });
    }
    else {
      console.log(name, msid, mortnum);
      re.create({ name: name, msid: msid, mortnum: mortnum, isEvaluated: isEvaluated }).fetch().exec(function (err, record) {
        console.log(record);
        sails.log('RE webservice reply: ', record,{status: "success"})
        return res.json(record);

      });

    }
  },


  app_blazers07: function (req, res) {
    var name = req.query['name'];
    var msid = req.query['msid'];
    var mortnum = req.query['mortnum'];
    var appraiseramount = req.query['appraiseramount'];
    sails.log('The information appraiser received ',' name : ', name,'MslID : ' , msid, 'Mortgage Nummber : ' ,mortnum,);
    sails.log('The amount the appraiser has given ', appraiseramount);

    if (name.length <= 0 && msid.length <= 0 && mortnum.length && appraiseramount.length <= 0) {
      return res.json({ err: 'Enter the details' });
    }
    else {
      console.log(name, msid, mortnum, appraiseramount);
      app.create({ name: name, msid: msid, mortnum: mortnum, appraiseramount: appraiseramount }).fetch().exec(function (err, record) {
        console.log(record);
        var successRecord = record
        // to update isEvaluated in re table
        re.updateOne({ isEvaluated: false }).set({ isEvaluated: true }).where({ mortnum: mortnum })
          .exec(function (err, record) {
            sails.log('RE web service appraiser reply : ',successRecord,{status: "success"});
            return res.json(successRecord);
          })

      });

    }
  },

  authenticate_into_re: function (req, res) {
    name = req.param('name')
    password = req.param('password')
    console.log('called login');


    if (typeof name !== 'undefined' && typeof password !== 'undefined') {
      recredentials.find({ name: name }).exec(function (err, records) {
        if (err) {
          return res.json(err)
        } else {
          if (records.length > 0) {
            var hashedPassword = "";
            records.forEach(element => {
              console.log(element['name']);
              global_username = element['name']
              hashedPassword = element['password'];
            });
            if (bcrypt.compareSync(password, hashedPassword)) {
              return res.json({ records, status: "success", msg: "Authenticated into Real Estate" })
            } else {
              return res.json({ status: "no hit", msg: "No records found for the username" })
            }
          }
          return res.json({ status: "no hit", msg: "No records found for the username" })
        }
      });
    } else {
      return res.json({ status: "failed", msg: "username is not specified" })
    }
  },

  authenticate_as_appraiser: function (req, res) {
    name = req.param('name')
    password = req.param('password')

    if (typeof name !== 'undefined' && typeof password !== 'undefined') {
      appcredentials.find({ name: name }).exec(function (err, records) {
        if (err) {
          return res.json(err)
        } else {
          if (records.length > 0) {
            var hashedPassword = "";
            records.forEach(element => {
              console.log(element['name']);
              global_username = element['name'];
              hashedPassword = element['password'];
            });
            if (bcrypt.compareSync(password, hashedPassword)) {
              return res.json({ records, status: "success", msg: "Authenticated into Appraiser" })
            } else {
              return res.json({ status: "no hit", msg: "No records found for the username" })
            }
          }
          return res.json({ status: "no hit", msg: "No records found for the username" })
        }
      });
    } else {
      return res.json({ status: "failed", msg: "username is not specified" })
    }
  },

  customer_info: function (req, res) {
    re.find().exec(function (err, records) {
      if (err) {
        return res.json(err)
      } else {
        if (records.length > 0) {
          records.forEach(element => {
            mortnum = element['mortnum']
            msid = element['msid']
            name = element['name']
            isEvaluated = element['isEvaluated']
          });
          // return res.json({ mortnum,msid,name})
          return res.json({ records })
        } else {
          records = []
          return res.json({ records })
        }

      }
    }
    )
  },
};

