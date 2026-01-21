import express from "express";
import { readFileSync } from "node:fs";

const app = express();
const _route = express.Router();
const DB_PATH = "db.json";

_route.get("/allorders", (req, res) => {
  const data = JSON.parse(readFileSync(DB_PATH, "utf-8"));
  res.json({ count: data.orders.length, orders: data.orders });
});

_route.get("/cancelled-orders", (req, res) => {
  const data = JSON.parse(readFileSync(DB_PATH, "utf-8"));
  const cancelled = data.orders.filter((o) => o.status === "cancelled");
  res.json({ count: cancelled.length, orders: cancelled });
});

_route.get("/shipped", (req, res) => {
  const data = JSON.parse(readFileSync(DB_PATH, "utf-8"));
  const shipped = data.orders.filter((o) => o.status === "shipped");
  res.json({ count: shipped.length, orders: shipped });
});

_route.get("/total-revenue/:productId", (req, res) => {
  const data = JSON.parse(readFileSync(DB_PATH, "utf-8"));
  const product = data.products.find((p) => p.id == req.params.productId);

  if (!product) return res.status(404).json({ error: "Product not found" });

  const revenue = data.orders
    .filter((o) => o.productId == product.id && o.status != "cancelled")
    .reduce((sum, o) => sum + o.quantity * product.price, 0);

  res.json({ productId: product.id, totalRevenue: revenue });
});

_route.get("/alltotalrevenue", (req, res) => {
  const data = JSON.parse(readFileSync(DB_PATH, "utf-8"));
  const totalRevenue = data.orders
    .filter((o) => o.status != "cancelled")
    .reduce((sum, o) => {
      const product = data.products.find((p) => p.id == o.productId);
      return sum + o.quantity * product.price;
    }, 0);
  res.json({ totalRevenue });
});

export default _route;
