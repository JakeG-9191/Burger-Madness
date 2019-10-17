var express = require("express");

var router = express.Router();

var burger = require("../models/burger.js");

router.get("/", function (req, res){
    burger.selectAll(function(data){
        var moreBurger = {
            burgers: data
        };
        console.log(moreBurger);
        res.render("index", moreBurger)
    });
});

router.post("/api/burgers", function (req, res){
    burger.insertOne([
        "burger_name", "devoured"
    ], [
        req.body.burger_name, req.body.devoured
    ], function (data){
        res.json({ id: data.insertId })
    });
});

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

module.exports = router;