
const rateLimit = require("express-rate-limit");



const allowedList = ['192.168.0.242'];

const limiter = rateLimit({
	windowMs: 1 * 60 * 1000, // 15 minutes
	limit: 10, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Redis, Memcached, etc. See below.
	// message: async (req, res) => {
	// 	return 'You can only make 5 requests every hour.'
	// },
	skip : async (req,res) => allowedList.includes(req.ip),
	
})

module.exports = limiter;