import express from "express";
const router = express.Router();
import { explainLogic } from "../controllers/explainController.js";

router.post("/explain", explainLogic);

export default router;
