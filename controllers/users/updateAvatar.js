const { ProcessImage } = require('../../services/users');
const { catchAsync } = require('../../utils')

exports.updateAvatar = catchAsync(async (req, res) => {
    const { user, file } = req

    if (file) {
        user.avatarURL = await ProcessImage.save(file)
      }
    
    const updatedUser = await user.save()
  
    res.status(200).json({
        avatarURL: updatedUser.avatarURL,
      })
  })