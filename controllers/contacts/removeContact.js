const { catchAsync } = require('../../utils')
const { Contact } = require('../../models')

exports.removeContact = catchAsync(async (req, res) => {
  const {contact} = req
  
  await Contact.findByIdAndDelete(contact.contactId)

  res.status(200).json({message: "contact deleted"})
})