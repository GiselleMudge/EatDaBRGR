//setting up our main functions to view all, create new burgers, and update to db
var orm = require("../config/orm.js");

var burger = {
    all: function(db) {
        orm.all("burgers", function(res) {
            db(res);
        });
    },
    create: function(name, db) {
        orm.create("burgers", [
            "burger_name", "devoured"
        ], [
            name, false
        ], db);
    },
    update: function(id, db) {
        var condition = "id=" + id;
        orm.update("burgers", {
            devoured: true
        }, condition, db);
    }
};

module.exports = burger;