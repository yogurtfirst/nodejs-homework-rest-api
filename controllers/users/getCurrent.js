const { catchAsync } = require('../../utils')

exports.getCurrent = catchAsync(async (req, res) => {
    const { user } = req
  
    res.status(200).json({
        user,
      })
  })