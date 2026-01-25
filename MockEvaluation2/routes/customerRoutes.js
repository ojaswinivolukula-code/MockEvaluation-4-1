import express from "express";
import {
  registerCustomer,
  deleteCustomer,
} from "../controllers/customerController.js";
const router = express.Router();
router.post("register", registerCustomer);
router.delete("deleteCustomer", deleteCustomer);
export default router;
