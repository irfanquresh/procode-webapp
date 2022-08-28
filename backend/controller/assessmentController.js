import express from "express";
const router = express.Router();

import { createAssessment } from "../service/assessmentService.js";

router.route("/").post(createAssessment);

export default router;
