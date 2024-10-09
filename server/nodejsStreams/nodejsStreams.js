const router = require("express").Router();
const fs = require("fs");
const path = require("path")
const zlib = require("zlib");

// stream is on of the way throught which we can transer/ or send response to client in chunks rather than collection 
// at once all data.


const filePath = path.resolve(__dirname, '../nodejsStreams/sample.txt');


router.get("/", (req,res) => {
    // console.log("=======backend=========", req.ip)
    // console.log(path.join('./sample.txt'))
    
// through this message we first collect all data and then we are sending the response - it can cause delay if dataset is very large.
//    fs.readFile(filePath, (err, data)=>{
//          if(err){
//             console.log("++++++",err.message);
//          }
//         res.write(data);
//         res.end();
//     })

    // by this nodejs-stream we get data in chunks and then send response , what it will do give data in chunks so we get some data rather than waiting for setDefaultAutoSelectFamilyAttemptTimeout.
    const stream = fs.createReadStream(filePath, "utf-8");
    stream.on("data", (chunk) => res.write(chunk));
    stream.on("end", ()=> res.end());
})


//throuh this route i i'm createing zip file
//so one way to create zip file is read that whole file and then create zip file and store read data in that zip file
// assume file size is 400mb so or cpu reading that file taking 400mb space and also we r creating zip file of 400 mb ,
// so total 800mb we r using in system , the better approach is while reading itself storing data in zip file 
// And that is possible by using this stream-only when we read data that time only creating zip-file and storeing it .

// ***  zlib - this module is provided by nodejs itself

router.get("/create-zipfile", (req,res) => {
  // fs.createReadStream(filePath) - It means we are reading the file and obviously in chunks we get
  // .pipe() - it means what data we get , we are passing it , so whateven data give by fs.createReactStream(filepath) got in .pipe()
  // zlib.createGzip().pipe - by this zlip module we creating zip file and by pipe paaing it 
  // fs.createWriteStream("./sample.zip") - by this we storing data in zip file whose name is - sample.zip
  fs.createReadStream(filePath).pipe(zlib.createGzip().pipe(fs.createWriteStream("./sample.zip")));
  res.send({message:"zip file Created"});
})


module.exports = router;