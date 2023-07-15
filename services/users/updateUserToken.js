const { catchAsync } = require('../../utils')
const { User } = require('../../models')

exports.updateUserToken = catchAsync(async (id, token) => {
    const updatedUser = await User.findByIdAndUpdate(
        id, { token }, { new: true }
    )
  
    return updatedUser
})