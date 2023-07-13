const { AppError, catchAsync } = require('../../utils')
const { Contact } = require('../../models')

exports.updateContact = catchAsync(async (req, res, next) => {
  if (!req.body) return next(new AppError(400, 'missing fields'))

  const { contactId } = req.params

  const updatedContact = await Contact.findByIdAndUpdate(
    contactId,
    {
      name: req.body.name || req.contact.name,
      email: req.body.email || req.contact.email,
      phone: req.body.phone || req.contact.phone,
    },
    {
      new: true,
    }
  )

  res.status(200).json({contact: updatedContact})
})