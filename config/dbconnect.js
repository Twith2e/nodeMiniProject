const mongoose = require("mongoose");

const connect = async (uri) => {
  try {
    const connection = mongoose.connect(uri, {
      serverSelectionTimeoutMS: 30000, // Timeout after 30 seconds instead of 10
      socketTimeoutMS: 45000,
    });
    if (connection) {
      console.log("Connection with database established");
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = connect;
