import express from "express";
import {readFileSync} from "node:fs";
const _route = express.Router();
const DB_PATH = "./src/index.js";
_route.get("/", (req, res) => {
  const data = JSON.parse(readFileSync(DB_PATH, "utf-8"));
  res.status(200).json(data.products);
});
export default _route;
