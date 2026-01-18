import express from "express";
import {  readFileSync, writeFileSync } from "node:fs";

const _route = express.Router();
const DB_PATH = "db.json";
_route.post("/", (req, res) => {
  const { productId, quantity } = req.body;
  const data = JSON.parse(readFileSync(DB_PATH, "utf-8"));
  const product = data.products.find((p) => p.id === productId);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  if (product.stock === 0 || quantity > product.stock) {
    return res.status(400).json({ message: "Insufficient stock" });
  }
  const newOrder = {
    id: data.orders.length + 1,
    productId,
    quantity,
    totalAmount: product.price * quantity,
    status: "placed",
    createdAt: new Date().toISOString(),
  };
  product.stock -= quantity;
  data.orders.push(newOrder);
  writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
  res.status(200).json(newOrder);
});
_route.get("/", (req, res) => {
  const data = JSON.parse(readFileSync(DB_PATH, "utf-8"));
  res.status(200).json(data.orders);
});

_route.delete("/:orderId", (req, res) => {
  const data = JSON.parse(readFileSync(DB_PATH, "utf-8"));
  const order = data.orders.find((o) => o.id === Number(req.params.orderId));
  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }
  if (order.status === "cancelled") {
    return res.status(400).json({ message: "Already cancelled" });
  }
  const today = new Date().toISOString();
  if (order.createdAt !== today) {
    return res.status(400).json({ message: "Cancellation period experied" });
  }
  order.status = "cancelled";
  const product = data.products.find((p) => p.id) === order.productId;
  product.stock += order.quantity;
  writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
  res.status(200).json({ message: "Order cancelled" });
});
_route.patch("/chage-status/:orderId", (req, res) => {
  const { status } = req.body;
  const data = JSON.parse(readFileSync(DB_PATH, "utf-8"));
  const order = data.orders.find((o) => o.id === req.params.orderId);
  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }
  const validFlow = { placed: "shipped", shipped: "deliverd" };
  if (order.status === "cancelled " || order.status === "delivered") {
    return res.status(400).json({ message: "Status change not allowed" });
  }
  if (validFlow[order.status] != status) {
    return res.status(400).json({ message: "Invalid status flow" });
  }
  order.status = status;
  writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
  res.status(200).json(order);
});
export default _route;
