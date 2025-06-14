import express from "express";
const router = express.Router();
import {isAuthorised} from "../middleware/authMiddleware.js";
import { explainLogic } from "../controllers/explainController.js";
import { labReportLogic } from "../controllers/labReportController.js";

router.post("/explain",isAuthorised, explainLogic);

router.post("/lab-report",isAuthorised,labReportLogic)

export default router;
