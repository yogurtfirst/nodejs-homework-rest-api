const { catchAsync } = require('../../utils')
const { User } = require('../../models')

exports.logout = catchAsync(async (req, res) => {
    const { id, } = req.user
    
    await User.findByIdAndUpdate( id, { token: '' } )
   
    res.status(204).json('Logged out')
  })