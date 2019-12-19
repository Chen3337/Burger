var express = require("express");
var burger = require("../models/burger.js");
var router = express.Router();

// mainpage
router.get("/", function(req,res){
    res.render("index");
});

router.post("/api/burger", function(req, res){
    burger.create(req.body.name, function(result){
        res.send(result);
    })
});


module.exports = router;