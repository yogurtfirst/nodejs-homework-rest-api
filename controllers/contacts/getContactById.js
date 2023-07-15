const { catchAsync } = require('../../utils')

exports.getContactById = catchAsync(async (req, res) => {
  const {contact} = req

  res.status(200).json({contact})
})