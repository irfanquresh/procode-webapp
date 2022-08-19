import express from "express";
const router = express.Router();

import { getBrands } from "../service/brandService.js";

router.route("/").get(getBrands);

export default router;
