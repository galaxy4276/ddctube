"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _Video = _interopRequireDefault(require("./models/Video"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

_mongoose["default"].connect(process.env.MONGO_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

_mongoose["default"].connection.once('connected', function () {
  console.log('MongoDB Connected');
});

_mongoose["default"].connection.on('disconnected', function () {
  console.log('MongoDB DisConnected');
});

_mongoose["default"].connection.on('error', function (error) {
  console.log("MongoDB Error : ".concat(error));
});