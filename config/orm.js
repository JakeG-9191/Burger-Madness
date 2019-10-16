var connection = require("../config/connection.js");

function printQuestionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    }

    return arr.toString();
}

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
    selectAll: function(table, cb) {
        var queryString = "SELECT * FROM " + table + ";";
        connection.query(queryString, function (err, data){
            if (err) throw err;
            cb(data)
        })
    },
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

module.exports = orm;