

module.exports.configurl={
    authenticateWebserviceUrl:"https://employerwebservice.azurewebsites.net/Assignment5employer/authenticateemployee",
    employeeMortgageWebserviceUrl:"https://employerwebservice.azurewebsites.net/Assignment5employer/employee_details_to_borker",
    authenticateSearchParams:["employee_id","password"], //Make sure the params match with names in input field names of index.ejs
    employeeMortgageSearchParams:["broker_application_number","broker_web_service_address"],
    webServiceDownError: "Web Service is down right now",
    webServiceError: "something went wrong",
}