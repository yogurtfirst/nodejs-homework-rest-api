const { AppError, catchAsync, signToken } = require('../../utils')
const { User } = require('../../models')
const { updateUserToken } = require('../../services/users')

exports.login = catchAsync(async (req, res) => {
    const { email, password } = req.body
  
    const user = await User.findOne({ email }).select('+password')
    
    if (!user) throw new AppError(401, 'Not authorized!')
    
    const passwordIsValid = await user.checkPassword(password, user.password)
  
    if (!passwordIsValid) throw new AppError(401, 'Not authorized!')

     if (!user.verify) throw new AppError(401, 'Email is not verified!')
  
    user.password = undefined
  
    const token = signToken(user.id)
    
    updateUserToken(user.id, token)
    
    res.status(200).json({
      user,
      token
    })
  })