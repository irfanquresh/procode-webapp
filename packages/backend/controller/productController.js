import express from "express";
const router = express.Router();

import { getProducts } from "../service/productService.js";

router.route("/").get(getProducts);

export default router;
