const { Contact } = require('../../models')
const { AppError, catchAsync } = require('../../utils')
const { createContactDataValidator } = require('../../utils/contactValidator')

exports.checkCreateContactData = catchAsync(async (req, res, next) => {
    const { error, value } = createContactDataValidator(req.body)
  
    if (error) return next(new AppError(400, 'Invalid contact data'))
  
    const emailExists = await Contact.exists({ email: value.email })
  
    if (emailExists) return next(new AppError(400, 'Contact with this email already exists'))

    const phoneExists = await Contact.exists({ phone: value.phone })
  
    if (phoneExists) return next(new AppError(400, 'Contact with this phone already exists'))
  
    req.body = value
  
    next()
  })