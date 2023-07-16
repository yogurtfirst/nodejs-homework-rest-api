const { User } = require('../../models')
const { Email } = require('../../services/users')
const { catchAsync } = require('../../utils')

exports.register = catchAsync(async (req, res) => {
    const newUserData = req.body
  
    const newUser = await User.create(newUserData)

    const verificationURL = `${req.protocol}://${req.get('host')}/api/users/verify/${newUser.verificationToken}`

    newUser.password = undefined
    newUser.verificationToken = undefined

    try {
      await new Email(newUser, verificationURL).sendVerifyMail();
    } catch (err) {
      console.log(err);
    }
  
    res.status(201).json({
      user: newUser,
      verificationURL,
    })
})