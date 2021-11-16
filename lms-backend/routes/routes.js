const express = require("express");
const users = require("../controller/users");
const auth = require("../controller/auth");
const error = require("../middleware/error");
const instructors = require("../controller/instructor");

const student = require("../controller/student");
const category = require("../controller/category");

module.exports = function (app) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use("/api/teachers", instructors);
  app.use("/api/students", student);
  app.use("/api/categories", category);

  app.use(error);
};
