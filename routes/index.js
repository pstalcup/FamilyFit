
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { username: req.session.username });
};

exports.login = function(req, res){
    var post = req.body; 
    if(true) {
        req.session.username = post.username; 
    }
    res.send("{}"); 
};

exports.logout = function(req, res){
    delete req.session.username; 
    res.send("{}"); 
}

exports.user = {
    "view" : function(req, res) {

    },
    "checkins" : function(req, res) {

    },
    "checkin" : function(req, res) {

    },
    "edit" : function(res, req) {

    }
}; 
exports.group = {
    "view" : function(req, res) {

    }, 
    "leaderboard" : function(req, res) {

    }, 
    "edit" : function(req, res) {

    }, 
    "join" : function(req, res) {
        
    }
}; 