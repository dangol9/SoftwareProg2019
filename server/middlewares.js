const jwt = require("jsonwebtoken");



const authMiddleware = (req, res, next) =>{
  const bearerHeader = req.headers["authorization"];
  if(!bearerHeader) return res.sendStatus(401);
  const token = bearerHeader.split(" ")[1].trim();
  console.log("token: ", token);
  if(!token) return res.send(401);
  jwt.verify( token, process.env.JWT_KEY, (err) => {
    if(err) {
      console.log(err);
      return res.status(401).send(err);
    }
    next();
  });
};

module.exports = {
  authMiddleware
};
