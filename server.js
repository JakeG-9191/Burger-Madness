// require express in order to function
var express = require("express");
// listen on local or dynamic port if on Heroku
var PORT = process.env.PORT || 8080;
// create easier syntax for express
var app = express();
// set public folder for highest priority use
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// add handlebars to project
var exphbs = require("express-handlebars");
// set main layout for handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
// add routes, provided by burger controller
var routes = require("./controllers/burgers_controller.js");

app.use(routes);
// listen for start of server
app.listen(PORT, function() {
  console.log("Server listening on: http://localhost:" + PORT);
});