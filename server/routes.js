const rateRouter = require("./rateLimits/rateLimit");
const workerRouter = require("./workerThreads/workerThread");

const setupRoutes = (app) => {
  app.use("/rate-limits", rateRouter);
  app.use("/worker-threads", workerRouter)
}

module.exports.setupRoutes =  setupRoutes;