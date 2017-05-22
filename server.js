var express = require('express');
var bodyParser = require('body-parser');
var exphbs = require("express-handlebars");
var methodOverride = require('method-override');

var app = express();
var PORT = process.env.PORT || 3000;

var db = require("./models");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }))

app.use(methodOverride("_method"));


app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Static directory
app.use(express.static(process.cwd() + "/public"));

//route
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

//snyc sequelize models
db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});