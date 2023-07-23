const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(
      "mongodb+srv://sarvesh:sga07@cluster0.a5aox5m.mongodb.net/?retryWrites=true&w=majority",
      { useUnifiedTopology: true }
    );
    console.log(`mongoDB connected : ${connection.connection.host}`);
  } catch (error) {
    console.log(`Error : ${error.message}`);
    process.exit();
  }
};
module.exports = connectDB;
