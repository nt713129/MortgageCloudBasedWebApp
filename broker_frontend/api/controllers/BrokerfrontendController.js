/**
 * BrokerfrontendController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var request = require('request');
var brokerWebserviceBaseUrl = sails.config.configurl.brokerWebserviceBaseUrl;
module.exports = {

    login_authenticate: function (req, res) {
        // Login Authentication for Entering MBR Portal 
        var request = require('request');
        var name = req.param('name');
        var password = req.param('password');
        request.get(
             //Get Request to the MBR web service
            brokerWebserviceBaseUrl + 'broker/authenticate_into_broker?name=' + name + '&password=' + password
            , function (error, response) {
                var success_status = JSON.parse(response.body).status
                if (success_status == "success") {
                    req.session.userid = JSON.parse(response.body).records[0]['id']
                    req.session.userName = JSON.parse(response.body).records[0]['name'];
                    return res.redirect('homepage')
                }
                else {
                    return res.view('pages/broker_login', { loginError: "error" });
                }
            });
    },
    customer_signup: function (req, res) {
        // SignUP For new customers of MBR Portal 
        var request = require('request');
        var name = req.param('user_name');
        var password = req.param('password');
        var email = req.param('email_id')

        request.get(
             //Get Request to the MBR web service
            brokerWebserviceBaseUrl + 'broker/customersignup?name=' + name + '&password=' + password + '&email=' + email
            , function (error, response) {
                var success_status = JSON.parse(response.body).status
                if (success_status == "success") {
                    return res.view('pages/broker_login', { signupSuccess: "success" })
                }
                else if (success_status == "hit") {
                    var msg = JSON.parse(response.body).msg
                    return res.view('pages/customer', { mailIDUniqueError: msg })
                }
                else
                    return res.redirect('/')
            });
    },

    fill_mortgage_form: function (req, res) {
        //Mortgage Form-For requesting Mortgage
        console.log(typeof req.session.userid);

        if (req.session.userid) {
            return res.view('pages/broker_frontend', { user_id: req.session.userid, user_name: req.session.userName })
        } else {
            return res.redirect('/')
        }
    },

    homepage: function (req, res) {
        console.log("In homepage");
        if (req.session.userid) {
            return res.view('pages/homepage')
        } else {
            return res.redirect('/')
        }
    },
    employer_info_status: function (req, res) {
        //Status of Employer Request
        console.log("In employer info");
        if (req.session.userid) {
            request.get(
                 //Get Request to the MBR web service
                brokerWebserviceBaseUrl + 'broker/retrieve_status?user_id=' + req.session.userid
                , function (error, response) {
                    var employer_info = JSON.parse(response.body).employer_info
                    employer_info = (employer_info ? employer_info : [])
                    //console.log(JSON.parse(response.body).mortgages_info);
                    return res.view('pages/broker_status', { employer_info: employer_info })
                });
        } else {
            return res.redirect('/')
        }
    },
    insurance_status: function (req, res) {
        //Insurance Status for the Mortgage Applied
        console.log("In mortgage");
        if (req.session.userid) {
            request.get( //Get Request to the MBR web service
                brokerWebserviceBaseUrl + 'broker/retrieve_insurance_status?user_id=' + req.session.userid
                , function (error, response) {
                    var insurance_info = JSON.parse(response.body).insurance_info
                    insurance_info = (insurance_info ? insurance_info : [])
                    // console.log(JSON.parse(response.body).insurance_info);
                    return res.view('pages/insurance_status', { insurance_info: insurance_info })
                });
        } else {
            return res.redirect('/')
        }
    },
    mortgage_status: function (req, res) {
        //Status of the Mortgage applied 
        console.log("In mortgage");
        if (req.session.userid) {
            request.get(
                //Get Request to the MBR web service
                brokerWebserviceBaseUrl + 'broker/retrieve_mortgage_status?user_id=' + req.session.userid
                , function (error, response) {
                    var mortgage_info = JSON.parse(response.body).mortgage_info
                    mortgage_info = (mortgage_info ? mortgage_info : [])
                    //console.log(JSON.parse(response.body).mortgages_info);
                    return res.view('pages/mortgages_statuses', { mortgage_info: mortgage_info })
                });
        } else {
            return res.redirect('/')
        }
    },
    broker_signout: function (req, res) {
        //For Signing out of Broker Application
        req.session.userName = null
        req.session.userid = null
        return res.view('pages/broker_login');
    }
};

