const validationErrorHandling = (err, req, res, next) => {
  if (err && err.error && err.error.isJoi) {
    res
    .status(400)
    .send({
      type: err.type,
      message: err.error.toString()
    })
  } else {
    next(err);
  }
}

module.exports = validationErrorHandling
