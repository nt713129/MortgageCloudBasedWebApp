/**
 * Assignment5employerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var employee_id;
var bcrypt = require('bcryptjs');
const saltRounds = 10;
module.exports = {
//Form authenticating employee for login
  authenticateemployee: function (req, res) {
    employee_id = req.param('employee_id')
    password = req.param('password')
    sails.log('Authentication information recieved from Employer frontend',employee_id,password )
    if (typeof employee_id !== 'undefined' && typeof password !== 'undefined' && !isNaN(employee_id)) {
      console.log(employee_id, password);
      Assignment5employer.find({ employee_id: employee_id }).exec(function (err, records) {
        if (err) {
          return res.json(err)
        } else {
          if (records.length > 0) {
            var hashedPassword = "";
            records.forEach(element => {
              hashedPassword = element['password'];
            });
            
            if (bcrypt.compareSync(password, hashedPassword)) {
              records.forEach(element => {
              sails.log('Employer Web service Login authenticate reply: ', {employee_name: element.employee_name,employee_id:element.employee_id},{status: "success", msg: "Employee authenticated" })
            });
              return res.json({ records: records, status: "success", msg: "Employee authenticated" })
            } else {
              return res.json({ status: "no hit", msg: "No records found for the employee_id" })
            }
          }
          return res.json({ status: "no hit", msg: "No records found for the employee_id" })
        }
      });
    } else {
      return res.json({ status: "failed", msg: "Either Employee ID or Password is not specified" })
    }

  },

  employee_details_to_borker: function (req, res) {
//For approving the status of the mortgage form
    var request = require('request');

    broker_application_number = req.param('broker_application_number')
    broker_web_service_address = req.param('broker_web_service_address')

    sails.log('The information received from the Employer after filling the mortgage applicatio number and webservice : ',broker_application_number,broker_web_service_address)
    if (typeof broker_application_number !== 'undefined' || typeof broker_web_service_address !== 'undefined') {
      Assignment5employer.find(employee_id = employee_id).exec(function (err, records) {
        if (err) {
          return res.json(err)
        } else {
          if (records.length > 0) {
            var employee_salary = records[0]['employee_salary']
            var employee_experience = records[0]['employee_experience']
            var employee_name = records[0]['employee_name']

            // console.log(employee_salary)
            console.log(broker_web_service_address + '?employee_salary=' + employee_salary + '&' + 'employee_experience=' + employee_experience + '&' + 'broker_application_number=' + broker_application_number + '&' + 'employee_name=' + employee_name)

            // console.log(employee_experience)
            request.post(
              broker_web_service_address + '?employee_salary=' + employee_salary + '&' + 'employee_experience=' + employee_experience + '&' + 'broker_application_number=' + broker_application_number + '&' + 'employee_name=' + employee_name, function (error, response) {
              });
              sails.log('Employer Web service Mortgage form reply',{ employee_salary: employee_salary, employee_experience: employee_experience, status: "success", msg: "Details forwarded to broker" })
            return res.json({ employee_salary: employee_salary, employee_experience: employee_experience, status: "success", msg: "Details forwarded to broker" })
          }
          return res.json({ status: "no hit", msg: "No records found for the employer" })
        }
      });
    } else {
      return res.json({ status: "failed", msg: "The parameters are not specified" })
    }

  },


};

