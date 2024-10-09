const express = require("express");
const app = express();
const routes = require("./routes");
const cors = require("cors");
const bodyParser = require('body-parser')
const limiter = require("./rateLimits/limiter");
const fs = require("fs");
app.use(bodyParser.json());
// const {mongoDb} = require("./urlShortners/db")
const expressMonitor = require("express-status-monitor")
// const txt = require("./nodejsStreams/sample.txt")

app.use(express.json());
app.use(cors());
app.use(expressMonitor());
// app.use(limiter);

routes.setupRoutes(app);
// mongoDb();



const port = 8000;
app.listen(port, () => {
	console.log(`server running on port ${port}`);
})