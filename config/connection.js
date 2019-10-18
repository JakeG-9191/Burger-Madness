// Require SQL connection
var mysql = require("mysql");
var connection;
// Provide SQL connection for either local or Heroku deployment
if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
 connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "deadeye22",
    database: "burgers_db"
});
};
// Logs connection
// connection.connect(function(err){
//     if (err) {
//         console.log("error: " + err.stack);
//         return;
//     }
//     console.log("connected as id " + connection.threadId)
// });
connection.connect();
// exports connection module, used by orm.js
module.exports = connection;