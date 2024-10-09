const mongoDb = require("mongodb");

// Replace the uri string with your connection string.
const uri =
  "mongodb://127.0.0.1:27017/url-Shortner";

// const client = new MongoClient(uri);
// mongoDb.connect(uri, {}, (err, client)=>{
//     const db = client.db();
//     console.log("===db==",db);
// })

async function run() {
  try {
    await client.connect();
    console.log("==========Mongodb Connected Successfully===============")
   
  } catch{
    console.log("Mongodb connections Error");
  }
}

module.exports = {mongoDb : run};
