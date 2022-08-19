export const getHealthStatus = async (req, res, next) => {
  res.status(200).json({ status: "OK" });
  res.end();
};
