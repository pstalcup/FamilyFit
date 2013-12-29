
/*
 * GET home page.
 */

exports.index = function(req, res){
    console.log(req.session); 
  res.render('index', { username: req.session.username });
};

exports.login = function(req, res){
    var post = req.body; 
    if(true) {
        req.session.username = post.username; 
    }
    res.send("{}"); 
};