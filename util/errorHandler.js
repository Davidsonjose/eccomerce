function ApiError(res, message, status) {
  return res.status(404).json({ message });
}

function ApiSuccess(res, message, status) {
  return res.status(200).json({ message });
}

function errors(error) {
    return error.message;
}
module.exports = {
    ApiError,
    ApiSuccess,
    errors
};
