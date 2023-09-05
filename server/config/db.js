// db.js
const mongoose = require('mongoose');

const dbURI = 'mongodb://0.0.0.0:27017/';

mongoose.connect(dbURI, { dbName:'upvote',useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

module.exports = mongoose.connection;
