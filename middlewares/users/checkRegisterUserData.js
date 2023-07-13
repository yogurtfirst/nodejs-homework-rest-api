const { catchAsync, AppError } = require('../../utils')
const { User } = require('../../models')
const { registerUserDataValidator } = require('../../utils')

exports.checkRegisterUserData = catchAsync(async (req, res, next) => {
    const { error, value } = registerUserDataValidator(req.body)
  
    if (error) throw new AppError(400, 'Invalid user data')
  
    const userExists = await User.exists({ email: value.email })
  
    if (userExists) throw new AppError(400, 'User with this email already exist')
  
    req.body = value
  
    next()
  })