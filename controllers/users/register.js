const { User } = require('../../models')
const { updateUserToken } = require('../../services/users')
const { catchAsync, signToken } = require('../../utils')

exports.register = catchAsync(async (req, res) => {
    const newUserData = req.body
  
    const newUser = await User.create(newUserData)

    newUser.password = undefined
  
    const token = signToken(newUser.id)

    updateUserToken(newUser.id, token)
    
    res.status(201).json({
      user: newUser,
      token,
    })
})