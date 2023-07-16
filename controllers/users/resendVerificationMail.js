const { AppError, catchAsync } = require('../../utils')
const { User } = require('../../models')
const { Email } = require('../../services/users')

exports.resendVerificationMail = catchAsync(async (req, res) => {
  if (!req.body) throw new AppError(400, 'missing required field email')

  const { email } = req.body

  const user = await User.findOne({email}).select('+verificationToken')

  if(!user) throw new AppError(200, 'Verification email sent')

  if(user.verify) throw new AppError(400, 'Verification has already been passed')

  const verificationURL = `${req.protocol}://${req.get('host')}/api/users/verify/${user.verificationToken}`

    try {
      await new Email(user, verificationURL).sendVerifyMail();
    } catch (err) {
      console.log(err);
    }

  res.status(200).json({
    message: 'Verification email sent',
  })
})