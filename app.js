const express = require("express");
const app = express();
const userRouter = require("./routes/userRoute");
const todoRouter = require("./routes/todo.route");
require("dotenv").config();
const connection = require("./config/dbconnect");
const CORS = require("cors");

//MIDDLEWARES
app.use(express.json());
app.use(CORS({ origin: "*" }));

//ROUTES
app.use("/user", userRouter);
app.use("/todo", todoRouter);

connection(process.env.MONGODB_URI);

const port = 3002;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});