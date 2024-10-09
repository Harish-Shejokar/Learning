const router = require("express").Router();

// routes for shortening the url 


router.get("/", (req,res) => {
    // console.log("=======backend=========", req.ip)
    res.send({message:"url Shorten successfully"})
})

module.exports = router;