import asyncHandler from "express-async-handler";

const createAssessment = asyncHandler(async (req, res) => {
  res.status(201).json({ status: "SUCCESS" });
});

export { createAssessment };
