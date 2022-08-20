export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler = (err, req, res, next) => {
  console.log("ErrorPath    = ", req?.get("origin") + req?.path);
  console.log("ErrorMessage = ", err?.message);

  const statusCode =
    err?.type === "time-out"
      ? 408
      : res?.statusCode === 200
      ? 500
      : res?.statusCode;

  res.status(statusCode);
  res.json({
    message: err?.message,
    stack: process.env.NODE_ENV === "production" ? null : err?.stack,
  });
};
