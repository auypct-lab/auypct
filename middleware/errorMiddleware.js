export const notFound = (req, res) => {
  res.status(404).json({ message: `Not Found - ${req.originalUrl}` });
};

export const errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: err.message || "Server Error" });
};
