import express from "express";
const router = express.Router();
import { explainLogic } from "../controllers/explainController.js";
import { labReportLogic } from "../controllers/labReportController.js";
import { validateUser } from "../middleware/validateUser.js";

router.post("/explain", validateUser, explainLogic);

router.post("/lab-report", validateUser, labReportLogic);

export default router;
