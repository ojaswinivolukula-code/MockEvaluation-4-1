import express from "express"
import { createOrder,updateOrder,getCustomerOrders,deleteOrder } from "../controllers/orderController.js"
const _route=express.Router()
_route.post("add-order",createOrder)
_route.get("get-my-orders/:customerId",getCustomerOrders),
_route.put("update-order/:orderId",updateOrder)
_route.delete("delete-order/:orderId",deleteOrder)
export default _route