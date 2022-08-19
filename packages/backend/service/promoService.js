import asyncHandler from "express-async-handler";
import Promo from "../models/promoModel.js";

const getPromos = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Promo.countDocuments({ ...keyword });
  const promos = await Promo.find(
    { ...keyword },
    { title: 1, startDate: 1, endDate: 1, _id: 1 }
  )
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ promos, page, pages: Math.ceil(count / pageSize) });
});

const getPromoById = asyncHandler(async (req, res) => {
  const promo = await Promo.findById(req.params.id);

  if (promo) {
    res.json(promo);
  } else {
    res.status(404);
    throw new Error("Promo not found");
  }
});

const deletePromo = asyncHandler(async (req, res) => {
  const promo = await Promo.findById(req.params.id);

  if (promo) {
    await promo.remove();
    res.json({ message: "Promo removed" });
  } else {
    res.status(404);
    throw new Error("Promo not found");
  }
});

const createPromo = asyncHandler(async (req, res) => {
  const {
    title,
    startDate,
    endDate,
    appliedOn,
    buyBrandOrProduct,
    offerProduct,
  } = req.body;

  const promo = new Promo({
    title,
    startDate,
    endDate,
    appliedOn,
    buyBrandOrProduct,
    offerProduct,
  });

  const createdPromo = await promo.save();
  res.status(201).json(createdPromo);
});

const updatePromo = asyncHandler(async (req, res) => {
  const {
    title,
    startDate,
    endDate,
    appliedOn,
    buyBrandOrProduct,
    offerProduct,
  } = req.body;

  const promo = await Promo.findById(req.params.id);

  if (promo) {
    promo.title = title;
    promo.startDate = startDate;
    promo.endDate = endDate;
    promo.appliedOn = appliedOn;
    promo.buyBrandOrProduct = buyBrandOrProduct;
    promo.offerProduct = offerProduct;

    const updatedPromo = await promo.save();
    res.json(updatedPromo);
  } else {
    res.status(404);
    throw new Error("Promo not found");
  }
});

export { getPromos, getPromoById, deletePromo, createPromo, updatePromo };
