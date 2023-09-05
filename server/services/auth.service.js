const User = require("../models/user.model")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  service : 'Gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' })
    }
    const code=Math.floor(100000 + Math.random() * 900000) ;
    const newUser = new User({ email, password: password,username:email.split( '@')[0],verificationCode: code})
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is: ${code}`,
    };
    await transporter.sendMail(mailOptions);
    await newUser.save()
    res.status(201).json({ message: 'User registered successfully'})
  } catch (error) {
    console.error('Registration error:', error)
    res.status(500).json({ error: 'An error occurred during registration' })
  }

}


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(401).json({ error: 'Invalid email or password' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return res.status(401).json({ error: 'Invalid email or password' });
        }
        const token = jwt.sign({ userId: user._id },process.env.AUTH_SECRET);
        res.status(200).json({ message: 'Login successful', token });
      } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'An error occurred during login' });
      }
}
