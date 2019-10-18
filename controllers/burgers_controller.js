// require express for application
var express = require("express");
// create router functionality
var router = express.Router();
// require pre-built models
var burger = require("../models/burger.js");
// provide all burger information within database to user if / route hit
router.get("/", function (req, res){
    burger.selectAll(function(data){
        var moreBurger = {
            burgers: data
        };
        console.log(moreBurger);
        res.render("index", moreBurger)
    });
});
// posts new burger based on user input
router.post("/api/burgers", function (req, res){
    burger.insertOne([
        "burger_name", "devoured"
    ], [
        req.body.burger_name, req.body.devoured
    ], function (data){
        res.json({ id: data.insertId })
    });
});
// updates burger for devoured or not devoured for html placement
router.put("/api/burgers/:id", function(req, res){
    var conditions = "id = " + req.params.id;
    console.log("conditions - ", conditions);

    burger.updateOne({
        devoured: req.body.devoured
    }, conditions, function (data){
        if (data.changedRows == 0){
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});
// exports router module 
module.exports = router;