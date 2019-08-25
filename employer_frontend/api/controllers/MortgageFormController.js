/**
 * MortgageFormController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    mortgageRequest: function (req, res) {
        // For status of the mortgage form applied
        var request = require("request");
        console.log(req.session.userid);
        
        if (req.session.userid) {
            employeeMortgageWebserviceUrl = new URL(sails.config.configurl.employeeMortgageWebserviceUrl);
            searchParameters = sails.config.configurl.employeeMortgageSearchParams;
            for (index in searchParameters) {
                employeeMortgageWebserviceUrl.searchParams.set(searchParameters[index], req.param(searchParameters[index]));
            }
            console.log(employeeMortgageWebserviceUrl.href)
            request.post(employeeMortgageWebserviceUrl.href)
            return res.redirect('mortgage_request_form');
        } else {
            return res.redirect('/')
        }
    }


};

