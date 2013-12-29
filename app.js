
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

function acl(route, level) {
    //provides simple access control
    //to use, warp a routing function in acl
    level = level || "user"; 
    if(level == "user") {
        return function(req, res) {
            if(req.session.username) {
                route(req, res); 
            } else {
                res.redirect('/');
            }
        }
    } else if(level == "group_admin") {
        return function(req, res) {
            if(req.params.gid in req.session.groups_admined) {
                route(req, res); 
            } else {
                res.redirect('/'); 
            }
        }
    } else if(level == "admin") {
        return function(req, res) {
            if(req.session.admin) {
                route(req, res); 
            } else {
                res.redirect('/');
            }
        }
    }
}

//***home page
app.get('/', routes.index);

//***user features
app.get('/user/:uid', routes.user.view);
app.get('/user/:uid/view', routes.user.view); 
app.get('/user/:uid/checkins', routes.user.checkins); 
//user logged in only features
app.get('/user/edit', acl(routes.user.edit));
app.get('/user/checkin', acl(routes.user.checkin))

//***group features
app.get('/group/:gid', routes.group.view); 
app.get('/group/:gid/view', routes.group.view); 
app.get('/group/:gid/leaderboard', routes.group.leaderboard); 
//group logged in only features
app.get('/group/:gid/join', acl(routes.group.join));
//group admin functions
app.get('/group/:gid/edit', acl(routes.group.edit, "group_admin"));  

//api calls
app.post('/login', routes.login);
app.post('/logout', routes.logout); 

//404
app.use(function(req, res) {
    console.log(req); 
    res.render('error',{})
})

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
