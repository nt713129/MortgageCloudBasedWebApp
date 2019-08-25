/**
 * LoginController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
     //Authenticating Employer Login

    authenticate: function (req, res) {
        var request = require("request");
        authenticateWebserviceUrl = new URL(sails.config.configurl.authenticateWebserviceUrl);
        searchParameters = sails.config.configurl.authenticateSearchParams;
        for (index in searchParameters) {
            authenticateWebserviceUrl.searchParams.set(searchParameters[index], req.param(searchParameters[index]));
        }
        console.log(authenticateWebserviceUrl.href);
        
        request.get(authenticateWebserviceUrl.href, function (error, response) {
            if (error) {
                console.log(error);
                return res.view('pages/error', { error: sails.config.configurl.webServiceError });
            } else if (response.statusCode == 403) {
                //console.log("Response status code: " + response.statusCode);
                return res.view('pages/error', { error: sails.config.configurl.webServiceDownError });
            } else {
                //console.log("Response status code: " + response.statusCode);
               // console.log("Response body: " + response.body);
                authenticateResponse = JSON.parse(response.body);
                sails.log('Response receieved from employer webservice',authenticateResponse)
                if (typeof authenticateResponse.status != 'undefined' && authenticateResponse.status == 'success') {
                    authenticateResponse.records.forEach(element => {
                        req.session.userName = element.employee_name;
                        req.session.userid = element.employee_id;
                    });
                    console.log('e', req.session.userName);
                    console.log('p', req.session.userid);
                    return res.redirect('mortgage_request_form');
                } else if (authenticateResponse.status == 'no hit' || authenticateResponse.status == 'failed') {
                    return res.view('pages/index', { loginError: "error" });
                } else {
                    return res.redirect('/');
                }
            }
        });
    },

    employer_signout: function (req, res) {
         //For signing out of employer portal

        console.log('logged out');
        req.session.destroy(function(err) {
            res.view('pages/index');
       });

    }

};

