const express = require('express');
const router = express.Router();
const User = require("./user.model.js");
const bcrypt = require("bcrypt");


// GETS ALL USERS
router.get("/api/users", (req, res) => {
  User.find({}, (err, docs) => {
    if(err) return handleError(err, res);
    res.status(200).json(docs);
  });
});


//LOGIN
router.post("/api/users/login", (req, res)=>{
  console.log("body", req.body);
  User.login(req.body)
  .then( user =>{
    res.json(user);
  })
  .catch(err =>{
    handleError(err, res);
  });
});

//creates new user
router.post("/api/users/signup", (req, res)=>{

  User.signup(req.body)
  .then( user => {
      res.status(200).json(user);
  })
  .catch(err =>{
    return handleError(err, res);
  });
});


//DELETE ALL USERS
router.delete("/api/users", (req, res) =>{
  User.deleteMany({}, (err, docs) =>{
    if(err) return handleError(err, res);
    console.log("Success delete all users");
    res.send(204);
  });

});


function handleError(err, res){
  console.log(err);
  res.sendStatus(500);
}




module.exports = router;
