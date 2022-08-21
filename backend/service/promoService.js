import asyncHandler from "express-async-handler";
import Promo from "../models/promoModel.js";

const getAll = asyncHandler(async (req, res) => {
  const promos = await Promo.find({});
  const data = promos.map((data) => {
    const {
      title,
      startDate,
      endDate,
      appliedOn,
      buyBrandOrProduct,
      offerProduct,
    } = data;
    return {
      title,
      startDate,
      endDate,
      appliedOn,
      buyBrandOrProduct: JSON.stringify(buyBrandOrProduct),
      offerProduct: JSON.stringify(offerProduct),
    };
  });

  const heading = [
    {
      title: "Title",
      startDate: "Start Date",
      endDate: "Last Date",
      appliedOn: "Applied On",
      buyBrandOrProduct: "Buy Brand Or Product",
      offerProduct: "Offer Product",
    },
  ];
  const header = [
    "title",
    "startDate",
    "endDate",
    "appliedOn",
    "buyBrandOrProduct",
    "offerProduct",
  ];

  res.status(200).json({ data, heading, header });
});

const getPromos = asyncHandler(async (req, res) => {
  const pageSize = 5;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        title: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Promo.countDocuments({ ...keyword });
  const promos = await Promo.find(
    { ...keyword },
    { title: 1, startDate: 1, endDate: 1, appliedOn: 1, _id: 1 }
  )
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ promos, count, page, total: Math.ceil(count / pageSize) });
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
    res.json({ status: "SUCCESS", message: `${promo.title} is removed!` });
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

export {
  getAll,
  getPromos,
  getPromoById,
  deletePromo,
  createPromo,
  updatePromo,
};
