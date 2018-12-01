//ORM functions
 
 var connection = require("./connection.js");
 
 function questionIt(num) {
     var arr = [];
 
    for (var i = 0; i < num; i++) {
        arr.push("?");
    }
     return arr.toString();
}
  function colSQL(ob) {
     // recognize columns in SQL to contain values in order
     var arr = [];
 
    for (var key in ob) {
        arr.push(key + "=" + ob[key]);
    }
     return arr.toString();
}
  var orm = {
     all: function(tableInput, db) {
         var queryString = "SELECT * FROM " + tableInput + ";";
         connection.query(queryString, function(err, result) {
             if (err) {
                 throw err;
             }
             db(result);
         });
     },
     // setting up array of values to save to columns aka cols
     create: function(table, cols, vals, db) {
         var queryString = "INSERT INTO " + table;
                queryString += " (";
                queryString += cols.toString();
                queryString += ") ";
                queryString += "VALUES (";
                queryString += questionIt(vals.length);
                queryString += ") ";
 
         console.log(queryString);
 
         connection.query(queryString, vals, function(err, result) {
             if (err) {
                 throw err;
             }
             db(result);
         });
     },
     // objColVals would be the columns and values that you want to update
     // an example of objColVals would be {name: panther, sleepy: true}
     update: function(table, objColVals, condition, db) {
         var queryString = "UPDATE " + table;
 
         queryString += " SET ";
         queryString += colSQL(objColVals);
         queryString += " WHERE ";
         queryString += condition;
 
         console.log(queryString);
         connection.query(queryString, function(err, result) {
             if (err) {
                 throw err;
             }
             db(result);
         });
     }
 };
 
 module.exports = orm;