
const mongoose = require("mongoose");
const DB_URL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASS}@cluster0-bawwc.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const Item = require("./item.model.js");


const connect = () => {
  return mongoose.connect(DB_URL)
  .then(() =>{
    console.log("Database success");
    migrate();
    return true;
  });
};




const CleanPrice = (dirty) => {
  const parts = dirty.split("to");
  return parts[0].replace("$", "");
};

function migrate(){
  Item.count({}, (err, x)=>{
    if(x > 0) {
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


module.exports = {
  connect
};
