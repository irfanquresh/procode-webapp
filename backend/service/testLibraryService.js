import asyncHandler from "express-async-handler";
import TestLibrary from "../models/testLibraryModel.js";

const getAll = asyncHandler(async (req, res) => {
  const testLibraries = await TestLibrary.find({});
  const data = testLibraries.map((data) => {
    const { title, slug, questions } = data;
    return {
      title,
      slug,
      questions,
    };
  });

  const heading = [
    {
      title: "Title",
      slug: "Slug",
      questions: "Questions",
    },
  ];
  const header = ["title", "slug", "questions"];

  res.status(200).json({ data, heading, header });
});

const getTestLibraries = asyncHandler(async (req, res) => {
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

  const count = await TestLibrary.countDocuments({ ...keyword });
  const testLibraries = await TestLibrary.find(
    { ...keyword },
    { title: 1, slug: 1, questions: 1, _id: 1 }
  )
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ tests:testLibraries, count, page, total: Math.ceil(count / pageSize) });
});

const getTestLibraryById = asyncHandler(async (req, res) => {
  const testLibrary = await TestLibrary.findById(req.params.id);

  if (testLibrary) {
    res.json(testLibrary);
  } else {
    res.status(404);
    throw new Error("TestLibrary not found");
  }
});

const deleteTestLibrary = asyncHandler(async (req, res) => {
  const testLibrary = await TestLibrary.findById(req.params.id);

  if (testLibrary) {
    await testLibrary.remove();
    res.json({
      status: "SUCCESS",
      message: `${testLibrary.title} is removed!`,
    });
  } else {
    res.status(404);
    throw new Error("TestLibrary not found");
  }
});

const createTestLibrary = asyncHandler(async (req, res) => {
  const { title, slug, questions } = req.body;

  const testLibrary = new TestLibrary({
    title,
    slug,
    questions,
  });

  const createdTestLibrary = await testLibrary.save();
  res.status(201).json(createdTestLibrary);
});

const updateTestLibrary = asyncHandler(async (req, res) => {
  const { title, slug, questions } = req.body;

  const testLibrary = await TestLibrary.findById(req.params.id);

  if (testLibrary) {
    testLibrary.title = title;
    testLibrary.slug = slug;
    testLibrary.questions = questions;

    const updatedTestLibrary = await testLibrary.save();
    res.json(updatedTestLibrary);
  } else {
    res.status(404);
    throw new Error("TestLibrary not found");
  }
});

export {
  getAll,
  getTestLibraries,
  getTestLibraryById,
  deleteTestLibrary,
  createTestLibrary,
  updateTestLibrary,
};
