import express from "express";
import { readFileSync, writeFileSync } from "node:fs";
const _route = express.Router();
const DB_PATH = "db.json";
_route.post("/", (req, res) => {
  try {
    const { name, price, stock } = req.body;
    const data = JSON.parse(readFileSync(DB_PATH, "utf-8"));
    if (!name || !price || !stock === undefined) {
      return res.status(400).json({ message: "Invalid product data" });
    }
    const newProduct = {
      id: data.products.length + 1,
      name,
      price: Number(price),
      stock: Number(stock),
    };
    data.products.push(newProduct);
    writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});
_route.get("/", (req, res) => {
  const data = JSON.parse(readFileSync(DB_PATH, "utf-8"));
  res.status(200).json(data.products);
});
export default _route;
