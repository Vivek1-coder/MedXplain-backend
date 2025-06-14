import express from "express";
const router = express.Router();
import { isAuthorised } from "../middleware/authMiddleware.js";
import { explainLogic } from "../controllers/explainController.js";
import { labReportLogic } from "../controllers/labReportController.js";
import { validateUser } from "../middleware/validateUser.js";

router.post("/explain", validateUser, explainLogic);

router.post("/lab-report", labReportLogic);

export default router;
