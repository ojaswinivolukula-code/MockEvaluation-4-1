import { supabase } from "@supabase/supabase-js";
import { validateOrder } from "../validations/orderValidations.js";
export const createOrder = async (req, res) => {
  const error = validateOrder(req.body);
  if (error) return res.status(400).json({ error });
  const { product_name, quantity, price, customerId } = req.body;
  const { data: customer } = await supabase
    .from("customers")
    .select("id")
    .eq("id", customerId)
    .single();
  if (!customer) {
    return res.status(400).json({ error: "Invalid customer ID" });
  }
  const { data, error: dbError } = await supabase
    .from("customers")
    .insert([{ product_name, quantity, price, customerId }])
    .select()
    .single();
  if (dbError) return res.status(400).json({ error: dbError.message });
  res.status(201).json(data);
};

export const getCustomerOrders = async (req, res) => {
  const { customerId } = req.params;
  const { data: customer } = await supabase
    .from("customers")
    .select("id")
    .eq("id", customerId)
    .single();
  if (!customer) return res.status(404).json({ error: "No customer found" });
  const { data } = await supabase
    .from("orders")
    .select("*")
    .eq("customerId", customerId)
    .single();
  res.json(data);
};
export const updateOrder = async (req, res) => {
  const { orderId } = req.params;
  const { data: order } = await supabase
    .from("orders")
    .select("id")
    .eq("id", orderId)
    .single();
  if (!order) return res.status(404).json({ error: "Order not found" });
};
export const deleteOrder = async (req, res) => {
  const { orderId } = req.params;
  const { error } = await supabase
    .from("orders")
    .select()
    .eq("id", orderId)
    .single();
  if (error) return res.status(404).json({ error: "Invalid order ID" });

  res.json({ message: "Order is deleted" });
};
