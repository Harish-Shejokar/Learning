const express = require("express");
const app = express();
const routes = require("./routes");
const cors = require("cors");
const bodyParser = require('body-parser')
const limiter = require("./rateLimits/limiter");
app.use(bodyParser.json());



app.use(express.json());
app.use(cors());
app.use(limiter);

routes.setupRoutes(app);

const port = 8000;
app.listen(port, () => {
	console.log(`server running on port ${port}`);
})