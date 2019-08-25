/**
 * BrokerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var global_username;
var bcrypt = require('bcryptjs');
const saltRounds = 10;
module.exports = {

  broker_blazers07: function (req, res) {
    var user_id = req.query['user_id'];
    var name = req.query['name'];
    var address = req.query['address'];
    var city = req.query['city'];
    var province = req.query['province'];
    var phonenumber = req.query['phonenumber'];
    var comname = req.query['comname'];
    var comadd = req.query['comadd'];
    var password = req.query['password'];
    var msid = req.query['msid'];
    var mortvalue = req.query['mortvalue'];
    //code to calculate random number referenced from https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
    var mortgage_num = Math.floor(Math.random() * 4000) + 1000;
    var employer_info_status = "Pending";
    var insurance_status = "Pending";
    sails.log('Information received from frontend', ' User ID:', user_id, ' Name : ', name, ' Address : ', address, 'City : ', city, ' Province : ', province, ' Phonenumber : ', phonenumber, ' Company name : ', comname, ' Company Address', comadd, ' MlsID : ', msid, ' Mortgage Value : ', mortvalue);

    if (user_id.length <= 0 && name.length <= 0 && address.length <= 0 && city.length <= 0 && province.length <= 0 && phonenumber.length <= 0 && comname.length <= 0 && comadd.length <= 0 && password.length <= 0 && msid.length <= 0 && mortvalue.length <= 0) {
      return res.json({ err: 'Enter the details' });
    }
    else {
      console.log(user_id, name, address, city, province, phonenumber, comname, comadd, msid, mortvalue);
      Broker_07.create({ user_id: user_id, name: name, address: address, city: city, province: province, phonenumber: phonenumber, comname: comname, comadd: comadd, mortgage_num: mortgage_num, employer_info_status: employer_info_status, msid: msid, mortvalue: mortvalue }).fetch().exec(function (err, record) {
        console.log("Successfully created Employer Info");
        Insuranceinfo.create({ user_id: user_id, name: name, mlsid: msid, mortgage_num: mortgage_num, appraiser_amount: 0, insurance_value: 0, deduction_value: 0, insurance_status: insurance_status }).fetch().exec(function (err, record) {
          console.log("Successfully created Insurance Info");
          Mortgagestatus.create({ user_id: user_id, name: name, mlsid: msid, mortgage_num: mortgage_num, employer_info_status: employer_info_status, insurance_status: insurance_status, mortgage_status: "Pending" }).fetch().exec(function (err, record) {
            console.log("Successfully created Mortgage Info");
            sails.log(' Broker Web service Reply:', mortgage_num);
            return res.json(mortgage_num);
          });
        });
      });
    }
  },

  customersignup: function (req, res) {
    // For customer signup into MBR PORTAL
    var name = req.query['name'];
    var password = req.query['password'];
    var mailid = req.query['email'];

    if (name.length <= 0 && password.length <= 0 && mailid.length <= 0) {
      return res.json({ err: 'Enter the details' });
    }
    else {
      Brokerlogincredentials.find({ or: [{ name: name }, { mailid: mailid }] }).exec(function (err, records) {

        if (err) {
          return res.json(err)
        } else {
          if (records.length == 0) {
            Brokerlogincredentials.create({ name: name, password: password, mailid: mailid }).fetch().exec(function (err, record) {
              return res.json({ record, status: "success", msg: "Customer signed up" })
            });
          }
          else {
            var recordUsername = "";
            var recordMailId = "";
            records.forEach(dbRecord => {
              recordUsername = dbRecord['name'];
              recordMailId = dbRecord['mailid'];
            })
            var msg = "Both UserName and MailID are registered with us, Please try other ones";
            if (recordUsername != name) {
              msg = "This MailID is already registered with us, Please try another one";
            } else if (recordMailId != mailid) {
              msg = "This UserName is already registered with us, Please try another one";
            }
            sails.log("Sign Up reply: ", msg)
            return res.json({ status: "hit", msg: msg })
          }
        }
      });

    }
  },

  authenticate_into_broker: function (req, res) {
        // For authenticating customer while logging  into MBR PORTAL

    name = req.param('name')
    password = req.param('password')
    console.log("authenticating");
    if (typeof name !== 'undefined' && typeof password !== 'undefined') {
      Brokerlogincredentials.find({ name: name }).exec(function (err, records) {
        if (err) {
          return res.json(err)
        } else {
          if (records.length > 0) {
            var hashedPassword = "";
            records.forEach(element => {
              global_username = element['name']
              hashedPassword = element['password'];
            });
            if (bcrypt.compareSync(password, hashedPassword)) {
              sails.log("Authenticate web service reply:", { status: "success", msg: "Authenticated into broker" })
              return res.json({ records, status: "success", msg: "Authenticated into broker" })
            } else {
              sails.log("Authenticate web service reply:", { status: "no hit", msg: "No records found for the username" })
              return res.json({ status: "no hit", msg: "No records found for the username" })
            }
          }
          sails.log("Authenticate web service reply:", { status: "no hit", msg: "No records found for the username" })
          return res.json({ status: "no hit", msg: "No records found for the username" })
        }
      });
    } else {
      return res.json({ status: "failed", msg: "username is not specified" })
    }
  },
  retrieve_status: function (req, res) {
        // For retreiving status of the mortgage request form made by the customer 

    user_id = req.param('user_id')
    sails.log("Employer Info application status request from user:", user_id)
    if (typeof user_id !== 'undefined') {
      Broker_07.find({ user_id: user_id }).exec(function (err, records) {
        if (err) {
          return res.json(err)
        } else {
          if (records.length > 0) {
            var employer_info = []
            records.forEach(element => {
              employer_info.push({
                "name": element['name'], "mortgage_num": element['mortgage_num'], "employer_info_status": element['employer_info_status'],
                "msid": element['msid'], "mortgage_value": element['mortvalue'],
              })
            });
            sails.log("Employer Info application status webservice reply", { employer_info: employer_info })
            return res.json({ employer_info: employer_info })
          }
          return res.json({ status: "no hit", msg: "No records found for the username" })
        }
      });
    } else {
      return res.json({ status: "failed", msg: "username is not specified" })
    }
  },
  retrieve_insurance_status: function (req, res) {
            // For retreiving insurance status and value of the mortgage request form made by the customer 

    user_id = req.param('user_id')
    sails.log("Insurance status request from user:", user_id)
    if (typeof user_id !== 'undefined') {
      Insuranceinfo.find({ user_id: user_id }).exec(function (err, insurances) {
        if (err) {
          return res.json(err)
        } else {
          console.log(insurances);
          if (insurances.length > 0) {
            var insurance_info = []
            insurances.forEach(insurance => {
              insurance_info.push({
                "name": insurance['name'], "mortgage_num": insurance['mortgage_num'], "msid": insurance['mlsid'],
                "appraiser_amount": insurance['appraiser_amount'], "insurance_value": insurance['insurance_value'],
                "deduction_value": insurance['deduction_value'], "insurance_status": insurance['insurance_status']
              })
            });
            sails.log("Insurancestatus webservice reply", { insurance_info: insurance_info })
            return res.json({ insurance_info: insurance_info })
          } else {
            return res.json({ insurance_info: [] })
          }
        }
      });
    } else {
      return res.json({ status: "failed", msg: "username is not specified" })
    }
  },
  retrieve_mortgage_status: function (req, res) {
            // For retreiving status of the mortgage request form made by the customer 

    user_id = req.param('user_id')
    sails.log("Mortgage application status request from user:", user_id)
    if (typeof user_id !== 'undefined') {
      Mortgagestatus.find({ user_id: user_id }).exec(function (err, mortgageStatuses) {
        if (err) {
          return res.json(err)
        } else {
          console.log(mortgageStatuses);
          if (mortgageStatuses.length > 0) {
            var mortgage_info = []
            mortgageStatuses.forEach(mortgageStatus => {
              mortgage_info.push({
                "name": mortgageStatus['name'], "mortgage_num": mortgageStatus['mortgage_num'], "msid": mortgageStatus['mlsid'],
                "employer_info_status": mortgageStatus['employer_info_status'], "insurance_status": mortgageStatus['insurance_status'],
                "mortgage_status": mortgageStatus['mortgage_status']
              })
            });
            sails.log("Mortgage status webservice reply", { mortgage_info: mortgage_info })
            return res.json({ mortgage_info: mortgage_info })
          } else {
            return res.json({ mortgage_info: [] })
          }
        }
      });
    } else {
      return res.json({ status: "failed", msg: "username is not specified" })
    }
  },
  update_insurance_status: function (req, res) {
            // For insurance status of the mortgage request form made by the customer 

    name = req.param('name')
    msld = req.param('msid')
    mortgage_num = req.param('mortnum')
    appraiser_amount = req.param('appraiseramount')
    insurance_value = req.param('insurance_value')
    deduction_value = req.param('deduction_value')
    console.log({ name: name });
    sails.log('The reply received from Insurance web service to Broker :', name, ' MslID : ', msld, ' Mortgage Number :  ', mortgage_num, ' Appraiser Amount :  ', appraiser_amount, ' Insurance Value :  ', insurance_value, ' Deduction Value :  ', deduction_value)
    Insuranceinfo.updateOne({ insurance_status: "Pending", appraiser_amount: 0, insurance_value: 0, deduction_value: 0 })
      .set({
        insurance_status: "Received", appraiser_amount: appraiser_amount, insurance_value: insurance_value,
        deduction_value: deduction_value
      })
      .where({ mortgage_num: mortgage_num })
      .exec(function (err, record) {

        var appraiser_amount = record['appraiser_amount'];
        var insurance_value = record['insurance_value'];
        var deduction_value = record['deduction_value'];
        var user_id = record['user_id']
        var mslid = record['mlsid']
        sails.log("Successfully Updated Insurance Info", mortgage_num);
        Mortgagestatus.updateOne({ insurance_status: "Pending" }).set({ insurance_status: "Received" }).where({ mortgage_num: mortgage_num })
          .exec(function (err, records) {
            if (err) {
              return res.json(err)
            } else {
              sails.log("Successfully Updated In Mortgage Info", mortgage_num);
              Brokerlogincredentials.find({ id: user_id }).exec(function (err, loginRecords) {
                if (err) {
                  return res.json(err)
                } else {
                  if (loginRecords.length > 0) {
                    var mailid = ""
                    var name = ""
                    loginRecords.forEach(element => {
                      mailid = element['mailid']
                      name = element['name']
                    });
                    azure_logic_app = sails.config.configurl.azure_logic_app_http
                    var request = require('request-promise');
                    options = {
                      method: 'POST',
                      uri: azure_logic_app,
                      body: {
                        "applicant_name": name,
                        "mortgage_num": mortgage_num,
                        "mslid": mslid,
                        "mailid": mailid,
                        "appraiser_amount": appraiser_amount,
                        "insurance_value": insurance_value,
                        "deduction_value": deduction_value,
                        "isInsuranceInfo": true
                      },
                      headers: { 'content-type': 'application/json' },
                      json: true // Automatically parses the JSON string in the response
                    };
                    request(options).then(function (res) {
                      console.log(res);
                    }).catch(function (err) {
                      console.log(err);
                    });
                    Mortgagestatus.find({ mortgage_num: mortgage_num }).exec(function (err, mortgageStatusUpdateRecord) {
                      if (err) {
                        return res.json(err)
                      } else {
                        console.log(mortgageStatusUpdateRecord);
                        if (mortgageStatusUpdateRecord.length > 0) {
                          var employer_info_status = ""
                          var insurance_status = ""
                          mortgageStatusUpdateRecord.forEach(statusUpdate => {
                            console.log(statusUpdate);
                            employer_info_status = statusUpdate['employer_info_status']
                            insurance_status = statusUpdate['insurance_status']
                          })
                          if (employer_info_status == "Received" && insurance_status == "Received") {
                            Mortgagestatus.updateOne({ mortgage_status: "Pending" }).set({ mortgage_status: "Approved" }).where({ mortgage_num: mortgage_num })
                              .exec(function (err, mortgageRecords) {
                                if (err) {
                                  return res.json(err)
                                } else {
                                  sails.log("Updated the Mortgage Status")
                                  azure_logic_app = sails.config.configurl.azure_logic_app_http
                                  var request = require('request-promise');
                                  options = {
                                    method: 'POST',
                                    uri: azure_logic_app,
                                    body: {
                                      "applicant_name": name,
                                      "mortgage_num": mortgage_num,
                                      "mslid": mslid,
                                      "mailid": mailid,
                                      "isMortgage": true
                                    },
                                    headers: { 'content-type': 'application/json' },
                                    json: true // Automatically parses the JSON string in the response
                                  };
                                  request(options).then(function (res) {
                                    console.log(res);
                                  }).catch(function (err) {
                                    console.log(err);
                                  });
                                }
                              })
                          }
                        }
                      }
                    })
                    return res.json({ status: "updated" })
                  }
                  return res.json({ status: "no hit", msg: "No records found for the username" })
                }
              });
            }
          })
      });
  },
  update_status: function (req, res) {
    broker_application_number = req.param('broker_application_number')
    employee_salary = req.param('employee_salary')
    employee_experience = req.param('employee_experience')
    employee_name = req.param('employee_name')

    console.log("in update status", employee_name, broker_application_number);
    if (typeof employee_name !== 'undefined') {
      Broker_07.updateOne({ employer_info_status: "Pending" }).set({ employer_info_status: "Received" }).where({ mortgage_num: broker_application_number })
        .exec(function (err, records) {
          if (err) {
            return res.json(err)
          } else {
            console.log(records, records['user_id']);
            var user_id = "";
            var mortgage_value = 0;
            var mslid = ""
            user_id = records['user_id']
            mortgage_value = records['mortvalue']
            mslid = records['msid']
            Mortgagestatus.updateOne({ employer_info_status: "Pending" }).set({ employer_info_status: "Received" }).where({ mortgage_num: broker_application_number })
              .exec(function (err, mortgageRecords) {
                if (err) {
                  return res.json(err)
                } else {
                  Brokerlogincredentials.find({ id: user_id }).exec(function (err, loginRecords) {
                    if (err) {
                      return res.json(err)
                    } else {
                      if (loginRecords.length > 0) {
                        var mailid = ""
                        loginRecords.forEach(element => {
                          mailid = element['mailid']
                        });
                        azure_logic_app = sails.config.configurl.azure_logic_app_http
                        var request = require('request-promise');
                        options = {
                          method: 'POST',
                          uri: azure_logic_app,
                          body: {
                            "applicant_name": employee_name,
                            "mortgage_num": broker_application_number,
                            "mortgage_value": mortgage_value,
                            "mslid": mslid,
                            "mailid": mailid,
                            "isEmployerInfo": true
                          },
                          headers: { 'content-type': 'application/json' },
                          json: true // Automatically parses the JSON string in the response
                        };
                        request(options).then(function (res) {
                          console.log(res);
                        }).catch(function (err) {
                          console.log(err);
                        });
                        Mortgagestatus.find({ mortgage_num: broker_application_number }).exec(function (err, mortgageStatusUpdateRecord) {
                          if (err) {
                            return res.json(err)
                          } else {
                            if (mortgageStatusUpdateRecord.length > 0) {
                              var employer_info_status = ""
                              var insurance_status = ""
                              mortgageStatusUpdateRecord.forEach(statusUpdate => {
                                console.log(statusUpdate);
                                employer_info_status = statusUpdate['employer_info_status']
                                insurance_status = statusUpdate['insurance_status']
                              })
                              if (employer_info_status == "Received" && insurance_status == "Received") {
                                Mortgagestatus.updateOne({ mortgage_status: "Pending" }).set({ mortgage_status: "Approved" }).where({ mortgage_num: broker_application_number })
                                  .exec(function (err, mortgageRecords) {
                                    if (err) {
                                      return res.json(err)
                                    } else {
                                      sails.log("Updated the Mortgage Status")
                                      azure_logic_app = sails.config.configurl.azure_logic_app_http
                                      var request = require('request-promise');
                                      options = {
                                        method: 'POST',
                                        uri: azure_logic_app,
                                        body: {
                                          "applicant_name": employee_name,
                                          "mortgage_num": broker_application_number,
                                          "mslid": mslid,
                                          "mailid": mailid,
                                          "isMortgage": true
                                        },
                                        headers: { 'content-type': 'application/json' },
                                        json: true // Automatically parses the JSON string in the response
                                      };
                                      request(options).then(function (res) {
                                        console.log(res);
                                      }).catch(function (err) {
                                        console.log(err);
                                      });
                                    }
                                  })
                              }
                            }
                          }
                        })
                        return res.json({ status: "updated" })
                      }
                      return res.json({ status: "no hit", msg: "No records found for the username" })
                    }
                  });
                }
              })
          }
        });
    } else {
      return res.json({ status: "failed", msg: "username is not specified" })
    }
  }



};

