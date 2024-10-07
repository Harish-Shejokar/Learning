const router = require("express").Router();

// Learning about express-rateLimit - in this we can set a limit to api according to time


router.get("/", (req,res) => {
    // console.log("=======backend=========", req.ip)
    res.send({message:"rate Limit"})
})

module.exports = router;