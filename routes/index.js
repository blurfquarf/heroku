var express = require('express');
var router = express.Router();

/* GET home page. */
// GET home page.
router.get('/', function(req, res) {
  res.redirect('/catalog');
});

function ensureAuthenticated(req,res,next){

  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/catalog/login');
}

module.exports = router;
