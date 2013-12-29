
/*
 * GET home page.
 */

exports.i = function(req, res){
  res.render('index', { username: req.session.username });
};

console.log("poop max b"); 
