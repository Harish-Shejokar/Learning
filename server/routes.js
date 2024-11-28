const rateRouter = require("./rateLimits/rateLimit");
const workerRouter = require("./workerThreads/workerThread");
const streamRouter = require("./nodejsStreams/nodejsStreams");
const pdfRouter = require("./pdfLearn/pdf");

const setupRoutes = (app) => {
  app.use("/rate-limits", rateRouter);
  app.use("/worker-threads", workerRouter)
  app.use("/streams", streamRouter);
  app.use("/pdf", pdfRouter);
}

module.exports.setupRoutes =  setupRoutes;