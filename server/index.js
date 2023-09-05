require('dotenv').config();
const express = require('express')
const { initializeSocket,getIo } = require('./sockets')
const cors = require('cors');
const app = express()
const server = require('http').createServer(app)
const port = process.env.PORT || 5000

require('./config/db')

app.use(express.json())

initializeSocket(server)

const corsOptions = {
  origin: 'http://localhost:3000',  // Replace with the allowed origin(s)
  methods: 'GET,PUT,POST,DELETE', // Specify the allowed HTTP methods
  credentials: true,             // Allow cookies and authentication headers
  optionsSuccessStatus: 200     // Set the status code for successful preflight requests
};

app.use(cors(corsOptions));
app.use((req, res, next) => {
  req.io = getIo();
  next()
})

app.use('/api/auth', require('./controllers/auth.controller'))
app.use('/api/post', require('./controllers/post.controller'))


server.listen(port, () => {
  console.log('Server is connected')
})
