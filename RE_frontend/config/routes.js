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

  '/': { view: 'pages/loginas' },
  '/login_customer': { view: 'pages/RE_login' },
  '/login_appraiser': { view: 'pages/RE_login_Appraiser' },
  '/RE_frontend': { view: 'pages/RE_frontend' },
  '/fill_re_form': 'REController.fill_re_form',
  '/app_signout': 'REController.app_signout',
  '/re_customer_signout': 'REController.re_customer_signout',
  '/customer_info': 'REController.customer_info',
  '/evaluate':'REController.evaluate'


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
