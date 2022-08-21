import express from "express";
const router = express.Router();

import {
  getAll,
  getPromos,
  getPromoById,
  createPromo,
  updatePromo,
  deletePromo,
} from "../service/promoService.js";

router.route("/all").get(getAll);
router.route("/").get(getPromos);
router.route("/").post(createPromo);
router.route("/:id").get(getPromoById);
router.route("/:id").put(updatePromo);
router.route("/:id").delete(deletePromo);

export default router;
