"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _helmet = _interopRequireDefault(require("helmet"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _passport = _interopRequireDefault(require("passport"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _path = _interopRequireDefault(require("path"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _connectMongo = _interopRequireDefault(require("connect-mongo"));

var _userRouter = _interopRequireDefault(require("./routes/userRouter"));

var _videoRouter = _interopRequireDefault(require("./routes/videoRouter"));

var _globalRouter = _interopRequireDefault(require("./routes/globalRouter"));

var _apiRouter = _interopRequireDefault(require("./routes/apiRouter"));

var _routes = _interopRequireDefault(require("./routes"));

var _middlewares = require("./middlewares/middlewares");

require("./passport");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable indent */
_dotenv["default"].config();

var app = (0, _express["default"])();
var CookieStore = (0, _connectMongo["default"])(_expressSession["default"]);
app.set('port', process.env.PORT || 8001);
app.use((0, _helmet["default"])());
app.set('view engine', 'pug');
app.set('views', _path["default"].join(__dirname, 'views'));
app.use('/static', _express["default"]["static"](_path["default"].join(__dirname, 'static')));
app.use((0, _cookieParser["default"])());
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use((0, _morgan["default"])('dev'));
app.use((0, _expressSession["default"])({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: false,
  store: new CookieStore({
    mongooseConnection: _mongoose["default"].connection
  })
}));
app.use(_passport["default"].initialize());
app.use(_passport["default"].session());
app.use(_middlewares.localsMiddleware);
app.use(_routes["default"].home, _globalRouter["default"]); // join

app.use(_routes["default"].users, _userRouter["default"]);
app.use(_routes["default"].videos, _videoRouter["default"]);
app.use(_routes["default"].api, _apiRouter["default"]);
var _default = app;
exports["default"] = _default;