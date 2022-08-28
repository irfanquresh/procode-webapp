import express from "express";
const router = express.Router();

import {
  getAll,
  getTestLibraries,
  getTestLibraryById,
  createTestLibrary,
  updateTestLibrary,
  deleteTestLibrary,
} from "../service/testLibraryService.js";

router.route("/all").get(getAll);
router.route("/").get(getTestLibraries);
router.route("/").post(createTestLibrary);
router.route("/:id").get(getTestLibraryById);
router.route("/:id").put(updateTestLibrary);
router.route("/:id").delete(deleteTestLibrary);

export default router;
