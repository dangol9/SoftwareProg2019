const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require("path");
const mongoose = require("mongoose");
const itemRouter = require("./item.router.js");
const userRouter = require("./user.router.js");
const authRouter = require("./auth.router.js");


const DB = require("./database.js");
const Item = require("./item.model.js");
const bodyParser = require("body-parser");

if(process.env.NODE_ENV !== "production"){
  require('dotenv').config();
}


const DB_URL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASS}@cluster0-bawwc.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

app.use(bodyParser.json());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1", itemRouter);
app.use("/api/v1/users", userRouter);






app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, "../dist", "index.html"));
});

app.get('/items/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, "../dist", "index.html"));
});

app.use(express.static('dist'));



function listen(){
  app.listen(PORT, () => {
    console.log("Server started", PORT);
    console.log(`http//localhost:${PORT}`);
  });
}

mongoose.connect(DB_URL)
  .then(() => {
    console.log("Success");
    migrate();
    //deleteAllItems();
    listen();
  })
  .catch(err =>{
    console.error("error", err);
  });

  function migrate(){
    Item.count({}, (err, x)=>{
      if(x > 0) {
        console.log("Already had items");
        return;
      }
      saveAllItems();
    });
  }


function deleteAllItems(){
  Item.deleteMany({}, (err, doc)=>{
    console.log('err', err, 'doc', doc);
  });
}



function saveAllItems(){
  console.log("migrate started");
  const items = DB.getItems();
  items.forEach(item =>{
    const document = new Item(item);
    document.save( (err) => {
      if(err){
        console.log(err);
        throw new Error("Something happened");
      }
      console.log('Save success');
    });
  });
}
