import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}, { name: 1, _id: 1 });
  res.status(200).json(products );
});

export { getProducts };
