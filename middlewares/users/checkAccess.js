const { catchAsync, AppError } = require('../../utils')
const { User } = require('../../models')
const { decodeToken } = require('../../services/users')


exports.checkAccess = catchAsync(async (req, res, next) => {
    const clearedToken = req.headers.authorization?.startsWith('Bearer') && req.headers.authorization.split(' ')[1]
    const userId = decodeToken(clearedToken)

    const currentUser = await User.findById(userId).select('+token')
  
    if (!currentUser || clearedToken !== currentUser.token) throw new AppError(401, 'Not logged in!')
  
    currentUser.token = undefined

    req.user = currentUser
  
    next()
  })