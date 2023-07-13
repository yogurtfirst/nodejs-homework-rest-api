const { AppError, catchAsync } = require('../../utils')
const { Contact } = require('../../models')

exports.updateStatusContact = catchAsync(async (req, res, next) => {
  if (!req.body) return next(new AppError(400, 'missing field favorite'))

  const { contactId } = req.params

  const updatedContact = await Contact.findByIdAndUpdate(
    contactId,
    {
      favorite: req.body.favorite,
    },
    {
      new: true,
    }
  )

  res.status(200).json({contact: updatedContact})
})