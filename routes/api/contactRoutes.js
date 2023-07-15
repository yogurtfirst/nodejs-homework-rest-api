const express = require('express')
const contactControllers = require('../../controllers/contacts')
const contactMiddlewares = require('../../middlewares/contacts')
const userMiddlewares = require('../../middlewares/users')

const contactsRouter = express.Router()

contactsRouter.use('/', userMiddlewares.checkAccess)
contactsRouter
  .route('/')
  .get(contactControllers.listContacts)
  .post(contactMiddlewares.checkCreateContactData, contactControllers.addContact)

contactsRouter.use('/:contactId', contactMiddlewares.checkContactById)
contactsRouter
  .route('/:contactId')
  .get(contactControllers.getContactById)
  .put(contactControllers.updateContact)
  .delete(contactControllers.removeContact)

contactsRouter.patch('/:contactId/favorite', contactControllers.updateStatusContact)

module.exports = contactsRouter