const { catchAsync } = require('../../utils')
const { Contact } = require('../../models')

exports.addContact = catchAsync(async (req, res) => {
const { user } = req

  const newContact = await Contact.create({
    ...req.body,
    owner: user
  })

  res.status(201).json({contact: newContact})
})