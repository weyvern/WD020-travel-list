const errorHandler = (err, req, res, next) => {
  process.env.NODE_ENV !== 'production' && console.error(err.stack);

  if (err.code === '23503') {
    err.statusCode = 403;
    err.message = 'Cannot delete because of constraint';
  }

  res.status(err.statusCode || 500).json({ error: err.message });
};

export default errorHandler;
