var jwt=require("jsonwebtoken")
module.exports=(req,res,next)=> {
    try{
        var token=req.autho
       // console.log(token);
       var decode= jwt.verify(token, 'secret');
       req.token=decode;
    next();
    }catch(error){
        res.redirect("/login")
    }
}
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.);
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};