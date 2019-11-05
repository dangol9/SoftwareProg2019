const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require("path");
const itemRouter = require("./item.router.js");
const userRouter = require("./user.router.js");
const authRouter = require("./auth.router.js");
const database = require("./database.js");
const bodyParser = require("body-parser");

if(process.env.NODE_ENV !== "production"){
  require('dotenv').config();
}




app.use(bodyParser.json());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1", itemRouter);
app.use("/api/v1/users", userRouter);






/** For images, bundle.js and css file*/
app.use("/static", express.static("dist/static"));

/** For index.html */
app.use("/*", express.static("dist"));



function listen(){
  app.listen(PORT, () => {
    console.log("Server started", PORT);
    console.log(`http//localhost:${PORT}`);
  });
}

database.connect()
  .then(() => {
    console.log("Success");
    listen();
  })
  .catch(err =>{
    console.error("error", err);
  });
