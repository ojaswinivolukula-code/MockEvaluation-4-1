import express from "express";
//import { logger } from "./middlewares/logger.middleware.js"
import { rateLimiter } from "./middlewares/ratelimit.middleware.js";
import { notFound } from "./middlewares/notFound.middleware.js";
import userRouter from "../root/routes/user.routes.js";
import vechileRouter from "../root/routes/vehicle.routes.js";
const app = express();
const PORT = 3000;
app.use(express.json());
//app.use(logger)
app.use(rateLimiter);
app.use("/users", userRouter);
app.use("/vechiles", vechileRouter);
app.use(notFound);
app.listen(PORT, () => {
  console.log("Serve running on port", PORT);
});
