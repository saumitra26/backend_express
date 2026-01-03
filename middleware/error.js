export default function errorHandler(err, req, res, _next) {
  const statusCode = err.status || 500;

  res.status(statusCode).json({
    errorMessage: err.message || "Internal server error"
  });
}