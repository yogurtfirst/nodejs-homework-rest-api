const { catchAsync, AppError, signToken } = require('../../utils')
const { User } = require('../../models')
const { updateUserToken } = require('./updateUserToken')

exports.authUser = catchAsync(async (data) => {
    const { email, password } = data

    const user = await User.findOne({ email }).select('+password')
    
    if (!user) throw new AppError(401, 'Not authorized!')
  
    const passwordIsValid = await user.checkPassword(password, user.password)
  
    if (!passwordIsValid) throw new AppError(401, 'Not authorized!')
  
    user.password = undefined
  
    const token = signToken(user.id)
    
    updateUserToken(user.id, token)
    
    const registeredUser = {user, token}

    return registeredUser
})