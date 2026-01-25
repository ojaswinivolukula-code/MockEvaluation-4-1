import express from "express";
//import customerRouter from "./routes/customerRoutes.js";
// import order_route from "./routes/orderRoutes.js";
const app = express();
app.use(express.json());
//app.use("/customers", customerRouter);
//  app.use("/orders", order_route);
app.listen(3000, () => {
  console.log("Server started successfully");
});
