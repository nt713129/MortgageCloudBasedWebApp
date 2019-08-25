/**
 * InsurancewebserviceController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var brokerWebserviceBaseUrl = sails.config.configurl.brokerWebserviceBaseUrl;
module.exports = {

  authenticate_into_insurance: function (req, res) {
    name = req.param('name')
    password = req.param('password')
    if (typeof name !== 'undefined' && typeof password !== 'undefined') {
      Insurancewebservice.find({ name: name, password: password }).exec(function (err, records) {
        if (err) {
          return res.json(err)
        } else {
          if (records.length > 0) {
            records.forEach(element => {
              console.log(element['name']);
              global_username = element['name']
            });
            return res.json({ records, status: "success", msg: "Authenticated into insurance" })
          }
          return res.json({ status: "no hit", msg: "No records found for the username" })
        }
      });
    } else {
      return res.json({ status: "failed", msg: "username is not specified" })
    }
  },

  from_realestate: function (req, res) {
    name = req.param('name')
    msid = req.param('msid')
    mortnum = req.param('mortnum')
    appraiseramount = req.param('appraiseramount')
    insurance_value = appraiseramount * 0.60
    deduction_value = insurance_value / 12
    var request = require('request')
    sails.log('The information received from RE webservice is : name : ', name, ' MslID : ', msid, ' Mortgage Number :  ', mortnum, ' Appraiser Amount :  ', appraiseramount)
    if (typeof name !== 'undefined' && typeof appraiseramount !== 'undefined' && typeof msid !== 'undefined' && typeof mortnum !== 'undefined') {
      sails.log('The insurance Web service reply', name, ' MslID : ', msid, ' Mortgage Number :  ', mortnum, ' Appraiser Amount :  ', appraiseramount, ' Insurance Value :  ', insurance_value, ' Deduction Value :  ', deduction_value)
      request.get(
        brokerWebserviceBaseUrl + 'broker/update_insurance_status?name=' + name + '&msid=' + msid + '&mortnum=' + mortnum + '&appraiseramount=' + appraiseramount + '&insurance_value=' + insurance_value + '&deduction_value=' + deduction_value
        , function (error, response) {
          sails.log('Successfully received response from '+brokerWebserviceBaseUrl + 'broker/update_insurance_status');
        });
    }
  }
};

