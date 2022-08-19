import express from "express";
const router = express.Router();

import {
  getPromos,
  getPromoById,
  createPromo,
  updatePromo,
  deletePromo,
} from "../service/promoService.js";

router.route("/").get(getPromos);
router.route("/").post(createPromo);
router.route("/:id").get(getPromoById);
router.route("/:id").put(updatePromo);
router.route("/:id").delete(deletePromo);

export default router;
