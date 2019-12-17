var connection = require("./connection");

var orm = {
    selectAll: function () {
        var query = "SELECT * FROM burgers";
        connection.query(query, function (err, result) {
            if (err) throw err;
            return result;
        });
    },
    insertOne: function (name, devoured) {
        var query = "INSERT INTO burgers_db.burgers (burger_name, devoured) VALUE ( ? , ?)";
        connection.query(query, [name, devoured] ,function (err, result) {
            if (err) throw err;
            return result;
        });
    },
    updateOne: function(column, newValue, id ){
        var query = "UPDATE burgers SET ?? = ? WHERE id = ?";
        connection.query(query,[column, newValue, id], function (err, result) {
            if (err) throw err;
            return result;
        });
    }
};

module.exports = orm;
