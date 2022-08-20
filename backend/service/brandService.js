import asyncHandler from "express-async-handler";
import Brand from "../models/brandModel.js";

const getBrands = asyncHandler(async (req, res) => {
  const brands = await Brand.find({}, { name: 1, _id: 1 });
  res.json(brands);
});

export { getBrands };
