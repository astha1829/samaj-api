const catchAsync = (fn) => {
  return (req, res, next) => {
      Promise.resolve(fn(req, res, next)).catch(next); // Ensure that next is properly passed here
  };
};

module.exports = catchAsync;
