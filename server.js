const express = require('express')
const app = express()
const PORT = 3000
const path = require("path");

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, "web_store", "index.html"));
})
app.use(express.static('web_store'));
app.listen(process.env.PORT || PORT, () => {
  console.log("Server started", PORT);
});
