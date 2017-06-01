var db = require("../models");

module.exports = function(app){

  app.get("/", function(req, res){
    db.Burger.findAll({}).then(function(data){
      var burgers = {
        burgers: data
      };
      res.render('index', burgers);
    });
  });

  app.post("/", function(req, res){
    db.Burger.create({
      burger_name: req.body.burger_name
    })
    .then(function(data){
      res.redirect('/');
      //res.render('index', burgerObj);
    });
  });

  app.put("/:id", function(req, res){
    db.Burger.update(
      {
        devoured: true //???
      },
        {
          where: {
            id: req.params.id
        }
      }).then(function(data){
        //res.redirect('/');
        res.redirect('/');
      });
  });

};