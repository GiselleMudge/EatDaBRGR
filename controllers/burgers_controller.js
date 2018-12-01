//our dependencies
var express = require('express');
var router = express.Router();
var burger = require('../models/burger.js');

//get route to index
router.get('/', function(req, res) {
    res.redirect('/burgers');
});

router.get('/burgers', function(req, res) {
    //calls for all burgers
    burger.all(function(burger_data) {
        //wrapper for orm to return burger_data, handlebars to index
        res.render('index', { burger_data });
    });
});

//post route to index
router.post('/burgers/create', function(req, res) {
    if (req.body.burger_name == '') {
        //error handling display to CL, not to web page
        console.log('HEY! Enter a burger or NO BURGER FOR YOU!');
        res.redirect('/');
    } else {
        //request object above becomes input for adding new burger
        burger.create(req.body.burger_name, function(result) {
            //wrapper for orm to console log, handlebars to index
            console.log(result);
            res.redirect('/');
        });
    }
});

//put route to index
router.put('/burgers/update', function(req, res) {
    burger.update(req.body.burger_id, function(result) {
        //wrapper for orm to console log, handlebars to index
        console.log(result);
        res.redirect('/');
    });
});

module.exports = router;