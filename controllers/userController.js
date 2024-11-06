const usermodel = require("../models/userModels");
const bcrypt = require("bcryptjs");

const userSignup = async (req, res) => {
  try {
    console.log(req.body);
    const { firstname, lastname, email, password } = req.body;

    if (!firstname || !lastname || !email || !password) {
      res
        .status(400)
        .send({ message: "All fields are mandatory", status: false });
    } else {
      try {
        const user = await usermodel.create(req.body);
        if (user) {
          res.status(200).send({ message: "Signup successful", status: true });
        }
      } catch (error) {
        if (error.message.includes("E11000 duplicate key error collection")) {
          res
            .status(407)
            .send({ message: "Email already exists", status: false });
        } else {
          res.status(500).send({ message: error.message, status: false });
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res
        .status(400)
        .send({ message: "All fields are mandatory", status: false });
    } else {
      try {
        const user = await usermodel.findOne({ email: email });
        if (!user) {
          res.status(400).send({ message: "User not found", status: false });
        } else {
          try {
            const decryptedPassword = await bcrypt.compare(
              password,
              user.password
            );
            if (!decryptedPassword) {
              res.status(405).send({
                message: "Incorrect email or password",
                status: false,
              });
            }
            res.status(200).send({ message: "Login successful", status: true });
          } catch (error) {
            console.log(error);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { userSignup, userLogin };
