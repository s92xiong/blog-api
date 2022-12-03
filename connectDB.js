const mongoose = require("mongoose");
const { MONGODB_URI } = process.env;

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(MONGODB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true
    });
    console.log(`MongoDB is connected!`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

exports.connectDB = connectDB;