const { Schema, Types, model} = require('mongoose')

const contactSchema = Schema({
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      required: true,
      unique: [true, 'Duplicated email'],
    },
    phone: {
      type: String,
      required: true,
      unique: [true, 'Duplicated phone'],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Types.ObjectId,
      ref: 'user',
    },
  },
  {
    versionKey: false,
  }
)
  
  const Contact = model('contacts', contactSchema)
  
  module.exports = Contact