const {Worker} = require("worker_threads");
const router = require("express").Router();

//by this we created a new Thread and passed a file name - which will execute task in that Thread...
const factorialWorker = new Worker("./workerThreads/findFactorial.js");


router.get("/:number", (req,res) => {
    const number = req.params.number;
    console.log("find factorial of ",number); 
    // passing message from Main-Thread to Worker Thread--
    factorialWorker.postMessage(number)
    res.send({message:"worker-thread all fine"})
})

//getting message from Worker to Main Thread --
factorialWorker.on("message",(message) => {
    console.log(message);
})

module.exports = router;