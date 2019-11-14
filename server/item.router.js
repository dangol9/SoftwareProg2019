const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const Item = require("./item.model.js");



// DELETE
router.delete("/:itemId", (req, res) => {
  Item.deleteOne({"_id" : mongoose.Types.ObjectId(req.params.itemId)}, (err)=>{
    if (err) {console.log("IT FAILED", err); return res.send(500);}
    console.log("save made!");
    return res.send(204);
  });
});

//POST
router.post("/", (req, res) => {
  const props = {
    imgSrc: "google.com",
    title: "phone red",
    price: 200,
    category: "phones",
  };

//CREATION
  const item1 = new Item(props);
  item1.save( err => {
    if(err){
      console.log("error:", err);
      res.send(500);
      return;
    }
    console.log("Success create");
    res.send(201);
  });
});

//GET ITEMID
router.get("/:itemId", (req, res)=>{
  Item.findById(req.params.itemId, function (err, item) {
    if(err) {
      console.log("error", err);
      res.status(500).send(err);
      return;
    }
    res.send(item);
  });
});



//GET ITEMS
router.get("/", (req, res)=>{
  Item.find({}, function(err, items){
    if(err) {
      console.log("error", err);
      res.status(500).send(err);
      return;
    }
    res.send(items);
  });
});





module.exports = router;
