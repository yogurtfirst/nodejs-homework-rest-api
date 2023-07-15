const { catchAsync } = require('../../utils')
const { Contact } = require('../../models')

exports.listContacts = catchAsync(async (req, res) => {
  const contacts = await Contact.find({owner: req.user})

  res.status(200).json({contacts})
})