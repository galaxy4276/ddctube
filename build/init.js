"use strict";

require("@babel/polyfill");

var _dotenv = _interopRequireDefault(require("dotenv"));

require("./db");

var _app = _interopRequireDefault(require("./app"));

require("./models/Video");

require("./models/Comment");

require("./models/User");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var handleListening = function handleListening() {
  return console.log("Listenning on http://localhost:".concat(_app["default"].get('port')));
};

_app["default"].listen(_app["default"].get('port'), handleListening);