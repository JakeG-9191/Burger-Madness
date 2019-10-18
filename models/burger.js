// import orm module
var orm = require("../config/orm.js");
// use orm to call pre built CRU functions
var burger = {
    selectAll: function(cb) {
        orm.selectAll("burgers", function(res){
            cb(res);
        });
    },
    insertOne: function(col, vals, cb){
        orm.insertOne("burgers", col, vals, function(res){
            cb(res)
        });
    },
    updateOne: function(items, conditions, cb) {
        orm.updateOne("burgers", items, conditions, function(res){
            cb(res)
        });
    }
};
// export burger module
module.exports = burger;