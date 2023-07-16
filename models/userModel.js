const bcrypt = require('bcrypt')
const crypto = require('crypto')

const { Schema, model } = require('mongoose')

const { userSubscriptionsEnum } = require('../constants')

const userSchema = Schema({
    password: {
      type: String,
      required: [true, 'Set password for user'],
      select: false,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: Object.values(userSubscriptionsEnum),
      default: userSubscriptionsEnum.STARTER,
    },
    token: {
      type: String,
      select: false,
    },
    avatarURL: {
      type: String,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      select: false,
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

userSchema.pre('save', async function(next) {
  if (this.isNew) {
    const emailHash = crypto.createHash('md5').update(this.email).digest('hex')

    this.avatarURL = `https://www.gravatar.com/avatar/${emailHash}.jpg?d=monsterid`

    this.verificationToken = crypto.randomBytes(32).toString('hex')
  }

  if (!this.isModified('password')) return next()

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)

  next();
})

userSchema.methods.checkPassword = (candidate, hash) => bcrypt.compare(candidate, hash)
  
const User = model('users', userSchema)
  
module.exports = User