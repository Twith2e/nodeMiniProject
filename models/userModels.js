const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    trim: true,
    required: true,
  },
  lastname: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
});

userSchema.pre("save", async function (next) {
  try {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    if (hashedPassword) {
      this.password = hashedPassword;
      console.log(hashedPassword);
    }
    next();
  } catch (error) {
    console.log(error);
  }
});

const userModel = mongoose.model("user_collection", userSchema);

module.exports = userModel;
