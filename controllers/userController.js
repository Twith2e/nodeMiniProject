const usermodel = require("../models/userModels");
const bcrypt = require("bcryptjs");
const TOKEN = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

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
            const generatedToken = await TOKEN.sign(
              { email },
              `${SECRET_KEY}`,
              {
                expiresIn: "1d",
              }
            );

            res.status(200).send({
              message: "Login successful",
              status: true,
              token: generatedToken,
            });
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

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      res.status(401).send({ message: "token is required", status: false });
    } else {
      const verified = await TOKEN.verify(token, `${SECRET_KEY}`);
      if (verified) {
        res
          .status(200)
          .send({ message: "user verified successfully", status: true });
      }
    }
  } catch (error) {
    next(401, error);
    console.log(error);
  }
};

module.exports = { userSignup, userLogin, verifyToken };
