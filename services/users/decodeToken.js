const jwt = require('jsonwebtoken')

const { AppError } = require('../../utils')

exports.decodeToken = (token) => {
    if (!token) throw new AppError(401, 'Not logged in!')
  
    let decoded
  
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (err) {
      throw new AppError(401, 'Not logged in!')
    }
    
    return decoded.id
  }