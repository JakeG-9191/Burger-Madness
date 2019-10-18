// Require connection from connection.js
var connection = require("../config/connection.js");
// add ? for SQL functionality
function printQuestionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    }

    return arr.toString();
}
// creates more friendly string format for SQL
function objToSql(ob){
    var arr = [];

    for (var key in ob) {
        var value = ob[key];
        if (Object.hasOwnProperty.call(ob, key)) {
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            arr.push(key + "=" + value);
        }
    }
    return arr.toString();
}

var orm = {
    // select all data from the burger table to proivde to user
    selectAll: function(table, cb) {
        var queryString = "SELECT * FROM " + table + ";";
        connection.query(queryString, function (err, data){
            if (err) throw err;
            cb(data)
        })
    },
    // insert one burger based on user input
    insertOne: function(table, col, vals, cb) {
        var queryString = "INSERT INTO " + table;
        queryString += " (";
        queryString += col.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";

        console.log(queryString);

        connection.query(queryString, vals, function(err, data){
            if (err) throw err;
            cb(data)
        })
    },
    // update burger based on condition of being devoured or not
    updateOne: function (table, items, conditions, cb) {
        var queryString = "UPDATE " + table;
        queryString += " SET ";
        queryString += objToSql(items);
        queryString += " WHERE ";
        queryString += conditions;

        console.log(queryString);
        connection.query(queryString, function(err, data){
            if (err) throw err;
            cb(data)
        })
    }
};
// export orm module
module.exports = orm;