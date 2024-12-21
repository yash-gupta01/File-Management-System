const mongoose = require('mongoose');

const connectToDatabase = async () => {
  try {
    await mongoose.connect('mongodb://admin:adminpassword@mongodb:27017/mydatabase', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      authSource: 'admin',
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  }
};

module.exports = connectToDatabase;
