// models/user.js
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  username:{type:String,unique:true,required:true},
  verificationCode: { type: String,default:null }
})

userSchema.pre('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.password, salt)
    this.password = hashedPassword;
    next()
  } catch (error) {
    next(error)
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User
