const express = require('express');
const router = express.Router();
const DB = require("./database.js");
const mongoose = require("mongoose");



const itemSchema = new mongoose.Schema({
  imgSrc: { type: String, required: true},
  title: { type: String, required: true},
  price: { type: Number, required: true},
  category: { type: String, required: true},
  createdAt: { type: Date, default: Date.now},
});

const Item = mongoose.model("Item", itemSchema);


router.post("/api/items", (req, res) => {
  const props = {
    imgSrc: "google.com",
    title: "phone red",
    price: 200,
    category: "phones",
  };
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


router.get("/api/items/:itemId", (req, res)=>{
  Item.findById(req.params.itemId, function (err, item) {
    if(err) {
      console.log("error", err);
      res.status(500).send(err);
      return;
    }
    res.send(item);
  });
});





router.get("/api/items", (req, res)=>{
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
