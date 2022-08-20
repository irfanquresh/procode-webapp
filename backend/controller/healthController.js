import express from "express";
const router = express.Router();

import { getHealthStatus } from "../service/healthService.js";

router.route("/").get(getHealthStatus);

export default router;
