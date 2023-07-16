const express = require('express')
const userMiddleware = require('../../middlewares/users')
const userController = require('../../controllers/users')

const usersRouter = express.Router()

usersRouter.post('/register', userMiddleware.checkRegisterUserData, userController.register) 
usersRouter.post('/login', userController.login)
usersRouter.post('/logout', userMiddleware.checkAccess, userController.logout)
usersRouter.get('/current', userMiddleware.checkAccess, userController.getCurrent)
usersRouter.patch('/avatars', userMiddleware.checkAccess, userMiddleware.uploadUserAvatar, userController.updateAvatar)

module.exports = usersRouter