require("dotenv").config();
const mongoose = require("mongoose");
const {
  MONGO_USERNAME,
  MONGO_AUTH_SOURCE,
  MONGO_PASSWORD,
  MONGO_DATABASE_NAME,
  MONGO_PORT,
} = process.env;
const connectToDatabase = async () => {
  try {
    await mongoose.connect(
      `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@mongodb:${MONGO_PORT}/${MONGO_DATABASE_NAME}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        authSource: `${MONGO_AUTH_SOURCE}`,
      }
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
};

module.exports = connectToDatabase;
