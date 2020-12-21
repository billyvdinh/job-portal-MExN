const catchAsync = require('../utils/catchAsync');

const getProfile = catchAsync(async (req, res) => {
  res.send(req.user);
});

module.exports = {
  getProfile,
};
