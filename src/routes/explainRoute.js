import express from "express";
const router = express.Router();
import { explainLogic } from "../controllers/explainController.js";
import { labReportLogic } from "../controllers/labReportController.js";

router.post("/explain", explainLogic);

router.post("/lab-report",labReportLogic)

export default router;
