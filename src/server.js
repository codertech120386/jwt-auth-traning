const express = require("express");

const connect = require("./config/db");

const { signup, signin } = require("./controllers/auth.controller");
const userController = require("./controllers/user.controller");
const validator = require("./middlewares/validator");

const app = express();
app.use(express.json());

app.use("/users", userController);

app.post(
  "/signup",
  validator({
    email: ["required", "email"],
    password: ["required", "minLength:8:character"],
  }),
  signup
);
app.post(
  "/signin",
  validator({
    email: ["required", "email"],
    password: ["required", "minLength:8:character"],
  }),
  signin
);

const start = async () => {
  await connect();

  app.listen(2244, () => {
    console.log("Listening on port 2244...");
  });
};

module.exports = start;
