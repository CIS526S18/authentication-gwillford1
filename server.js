const http = require('http');
const fs = require('fs');
const qs = require('querystring');
const view = require('./view/view');
const Router = require('./helpers/router');
const sessionController = require('./controller/sessions');
const studentController = require('./controller/students');
const PORT = 3000;

// create the template cache
view.cacheTemplates();

// create our router
var router = new Router();
router.addRoute('GET', '/login', sessionController.loginForm);
router.addRoute('GET', '/logout', sessionController.logout);
router.addRoute('POST', '/login', sessionController.login);
router.addRoute('GET', '/', studentController.list);
router.addRoute('GET', '/students', studentController.list);
router.addRoute('POST', '/students', studentController.create);
router.addRoute('GET', '/cookie', function(req, res) {
  res.setHeader('SetCookie', [
    'quote=cookies%20are%20for%20me;',
    "sessionid=212; Expires = Wed, 09, Jun 2021 10:10:14 GMT",
    "safe=value;HttpOnly"
    ]);
  res.end("cookie test");
});

/** @function handleRequest
  * Handles requests to the webserver by rendering a page listing
  * students, and processing any new student additions submitted
  * through an HTTP request.
  * @param {http.ClientRequest} req - the client request object
  * @param {htt.ServerResponse} res - the server response object
  */
function handleRequest(req, res) {
  // Check for form submittal
  if(req.method === "POST") {
    studentController.create(req, res);
  } else {
    studentController.list(req, res);
  }
}

// Create the webserver
var server = http.createServer(function(req, res) {
  router.route(req,res)
});

// Start listening for HTTP requests
server.listen(PORT, function() {
  console.log("Listening at port ", PORT);
});
