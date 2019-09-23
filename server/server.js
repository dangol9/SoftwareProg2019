const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require("path");
const DB = require("./database.js");


app.get("/api/items", (req, res)=>{
  res.json(DB.getItems());
});


app.get("/api/items/:itemId", (req, res)=>{
  res.send(DB.getItem(req.params.itemId));
});

app.post("/hello", (req, res)=>{
  res.send("post hello");
});

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});

app.use(express.static('dist'));
app.listen(PORT, () => {
  console.log("Server started", PORT);
  console.log(`http//localhost:${PORT}`);
});
