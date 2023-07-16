const { User } = require('../../models')
const { catchAsync, AppError } = require('../../utils')

exports.verifyUser = catchAsync(async (req, res) => {
    const { verificationToken } = req.params
  
    const user = await User.findOne({verificationToken})

    if(!user) throw new AppError(404, 'Not found')

    user.verificationToken = null
    user.verify = true
  
    await user.save()

    res.status(200).json({ message: 'Verification successful' })
})