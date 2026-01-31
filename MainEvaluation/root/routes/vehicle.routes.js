import express from "express";
import {
  createVechicle,
  getVehicles,
} from "../controllers/vehicle.controller.js";
const router = express.Router();
router.get("/:vehicleId", getVehicles);
router.post("/", createVechicle);
export default router;
