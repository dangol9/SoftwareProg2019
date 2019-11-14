const express = require('express');
const app = express();
const apiRouter = require("./apiRouter.js");
const PORT = process.env.PORT || 3000;
const path = require("path");
const database = require("./database.js");
const bodyParser = require("body-parser");

if(process.env.NODE_ENV !== "production"){
  require('dotenv').config();
}

app.use(bodyParser.json());
app.use(apiRouter);

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
