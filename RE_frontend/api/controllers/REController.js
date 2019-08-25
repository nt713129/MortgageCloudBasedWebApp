/**
 * REController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var reWebserviceBaseUrl=sails.config.configurl.reWebserviceBaseUrl;
module.exports = {

    login_authenticate: function (req, res) {
        var request = require('request');
        var name = req.param('name');
        var password = req.param('password');
        request.get(
            reWebserviceBaseUrl+'RE/authenticate_into_re?name=' + name + '&password=' + password
            , function (error, response) {
                var success_status = JSON.parse(response.body).status
                if (success_status == "success") {
                    //console.log(JSON.parse(response.body).records[0]['name']);                    
                    req.session.reUserid = JSON.parse(response.body).records[0]['id']
                    req.session.reUserName = JSON.parse(response.body).records[0]['name'];

                    return res.view('pages/RE_frontend', { user_name: req.session.reUserName })
                }
                else
                    return res.redirect('/')
            });
    },

    login_authenticate_app: function (req, res) {

        var request = require('request');
        var name = req.param('name');
        var password = req.param('password');
        request.get(
            reWebserviceBaseUrl+'RE/authenticate_as_appraiser?name=' + name + '&password=' + password
            , function (error, response) {

                var success_status = JSON.parse(response.body).status
                if (success_status == "success") {

                    req.session.appUserid = JSON.parse(response.body).records[0]['id']
                    req.session.appUserName = JSON.parse(response.body).records[0]['name'];


                    return res.redirect('/customer_info')
                }
                else
                    return res.redirect('/')
            });
    },


    fill_re_form: function (req, res) {
        return res.view('pages/RE_frontend')
    },

    customer_info: function (req, res) {
        // console.log(JSON.parse(res.body).mortnum);
        var request = require('request');
        request.get(
            reWebserviceBaseUrl+'RE/customer_info', function (error, response) {
                var data = [];
                data = JSON.parse(response.body).records;
                return res.render('pages/Appraiser_frontend', { data: data })

            });
    },
    evaluate: function (req, res) {
        var dataArray = [];
        var data = {};
        data.name = req.param('name');
        data.msid = req.param('msid');
        data.mortnum = req.param('mortnum');
        dataArray.push(data)
        return res.render('pages/appraiser_evaluate', { data: dataArray })

    },

    re_customer_signout : function (req, res) {        
        req.session.destroy(function (err) {
            return res.redirect('/');
        });
    },

    app_signout : function (req, res) {        
        req.session.destroy(function (err) {
            return res.redirect('/');
        });
    }

    
};

