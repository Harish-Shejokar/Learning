const rateRouter = require("./rateLimits/rateLimit");
const workerRouter = require("./workerThreads/workerThread");
const streamRouter = require("./nodejsStreams/nodejsStreams");

const setupRoutes = (app) => {
  app.use("/rate-limits", rateRouter);
  app.use("/worker-threads", workerRouter)
  app.use("/streams", streamRouter);
}

module.exports.setupRoutes =  setupRoutes;