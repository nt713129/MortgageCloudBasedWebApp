/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/broker_login' },
  '/homepage': { view: 'pages/homepage' },
  '/login_authenticate' :  'BrokerfrontendController.login_authenticate',
  '/fill_mortgage_form' :  'BrokerfrontendController.fill_mortgage_form',
  '/employer_info_status' :  'BrokerfrontendController.employer_info_status',
  '/mortgage_status' :  'BrokerfrontendController.mortgage_status',
  '/insurance_status' :  'BrokerfrontendController.insurance_status',
  '/broker_signout' :  'BrokerfrontendController.broker_signout',
  '/customer': { view: 'pages/customer' },
  '/customer_signup':'BrokerfrontendController.customer_signup'
  

  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
