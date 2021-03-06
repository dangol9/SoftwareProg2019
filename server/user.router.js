const express = require('express');
const router = express.Router();
const User = require("./user.model.js");
const bcrypt = require("bcrypt");
const Item = require("./item.model.js");
const {authMiddleware} = require("./middlewares");
const stripe = require('stripe')(process.env.stripe_secret);
const Payment = require("./payments.model");


router.param("userId", (req, res, next, userId) => {
  User.findById(userId, (err, user) => {
    if(err || !user) return res.status(500).send("Error user params");
    req.user = user;
    next();
  });
});

router.param("itemId", (req, res, next, itemId) => {
  Item.findById(itemId, (err, item) => {
    if(err || !item) return res.status(500).send("Error item params");
    req.item = item;
    next();
  });
});


// returns user object
router.get("/:userId", authMiddleware, (req, res) => {
  res.send(req.user);
});

// add an item to the cart
router.put("/:userId/cart/:itemId", (req, res) => {
  req.user.cart.push(req.item._id.toString());
  req.user.save( (err) => {
    if(err) {
      console.log(err);
      return res.status(500).send("Error cart save");
    }
    res.send(200);
  });
});

// remove an item from the cart
router.delete("/:userId/cart/:itemId", (req, res) => {

  const index = req.user.cart.findIndex(itemId => itemId === req.item._id.toString());
  req.user.cart.splice(index, 1);

  req.user.save( (err) => {
    if(err) {
      console.log(err);
      return res.status(500).send("Error cart delete");
    }
    res.send(200);
  });
});


// GETS ALL USERS
router.get("/", (req, res) => {
  User.find({}, (err, docs) => {
    if(err) return handleError(err, res);
    res.status(200).json(docs);
  });
});



//DELETE ALL USERS
router.delete("/", (req, res) =>{
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

router.get("/:userId/payments", authMiddleware, (req, res) => {
  Payment.getUserPayments(req.user._id)
  .then( docs => {
    res.send(docs);
  })
  .catch( err =>{
    console.log(err);
    res.send(500);
  })
});




router.post("/:userId/checkout", authMiddleware, async (req, res) => {
  const {err, amount} = await req.user.getCartAmount();
  if(error) {
    console.log(error);
    return res.send(500);
  }
  req.user.createPayment(amount)
  .then(() => {
    return req.user.clearCart();
  })
  .then(() => {
    return stripe.charges.create({
      amount: amount *100,
      currency : "eur",
      source: req.body.id,
    });
  })
  .then( stripeResponse =>{
    console.log(stripeResponse);
    res.send(200);
  })
  .catch( (err) => {
    console.log(err);
    res.send(500);
  });
});


module.exports = router;
