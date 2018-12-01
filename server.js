var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var timeout = require('connect-timeout');
var morgan = require('morgan'); //testing this out for logging traffic
var fs = require('fs');
//setting up dependencies and activating with app.use
var path = require('path');
var app = express();
        app.use("/static", express.static("public")); 
        // Timeout
        app.use(timeout(15000));
        app.use(haltOnTimedout);
        
 function haltOnTimedout(req, res, next) {
    if (!req.timedout) next();
}

//for morgan logging
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
        app.use(morgan('combined', { stream: accessLogStream }));
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(haltOnTimedout);
 //for override 
        app.use(methodOverride('_method'));
        app.use(haltOnTimedout);
 
 //setting up handlebars
 var exphbs = require('express-handlebars');
        app.engine('handlebars', exphbs({
            defaultLayout: 'main'
        }));
        app.set('view engine', 'handlebars');
 
 //Setting up our routes
 var routes = require('./controllers/burgers_controller.js');
        app.use('/', routes);
        app.use('/update', routes);
        app.use('/create', routes);
        app.use(haltOnTimedout);
 
 //setting up our port and log to confirm we are live
 var port = process.env.PORT || 3000;
 app.listen(port, () => console.log("We are now listening on port %s", port));