const errorHandler = (error, req, res, next) => {
  if (error.name === "MongoError") {
    if (error.code === 11000) {
      return res
        .status(409)
        .send({ message: "User already exists", status: false });
    }
  } else if (error.name === "Authentication error") {
    return res
      .status(401)
      .send({ message: "Email and Password does not match", status: false });
  } else if (error.name === "TokenExpiredError") {
    return res
      .status(401)
      .send({ message: "Token expired. Please login again", status: false });
  } else if (error.name === "AuthorizationError") {
    return res.status(403).send({
      message: "User is not authorized to perform this action",
      status: false,
    });
  } else {
    return res
      .status(500)
      .send({ message: "Internal Server Error", status: false });
  }
};

module.exports = errorHandler;
