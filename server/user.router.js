const express = require('express');
const router = express.Router();
const User = require("./user.model.js");
const bcrypt = require("bcrypt");


// GETS ALL USERS
router.get("/users", (req, res) => {
  User.find({}, (err, docs) => {
    if(err) return handleError(err, res);
    res.status(200).json(docs);
  });
});



//DELETE ALL USERS
router.delete("/users", (req, res) =>{
  User.deleteMany({}, (err, docs) =>{
    if(err) return handleError(err, res);
    console.log("Success delete all users");
    res.send(204);
  });

});


function handleError(err, res){
  console.log(err);
  res.status(500).send(err);
}




module.exports = router;
