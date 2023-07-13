const { Types } = require('mongoose')

const { Contact } = require('../../models')
const { AppError, catchAsync } = require('../../utils')

exports.checkContactById = catchAsync(async (req, res, next) => {
    const { contactId } = req.params

    const contactIdIsValid = Types.ObjectId.isValid(contactId)

    if (!contactIdIsValid) return next(new AppError(400, 'Bad request'))
      
    const contact = await Contact.find({_id: contactId, owner: req.user})
  
    if (!contact) return next(new AppError(404, 'Not found'))
  
    req.contact = contact
  
    next()
  })