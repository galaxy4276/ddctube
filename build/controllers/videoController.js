"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postDeleteComment = exports.postAddComment = exports.postRegisterView = exports.deleteVideo = exports.postEditVideo = exports.getEditVideo = exports.videoDetail = exports.postUpload = exports.getUpload = exports.video = exports.search = exports.home = void 0;

var _routes = _interopRequireDefault(require("../routes"));

var _Video = _interopRequireDefault(require("../models/Video"));

var _Comment = _interopRequireDefault(require("../models/Comment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var home = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var videos;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _Video["default"].find({}).sort({
              _id: -1
            });

          case 3:
            videos = _context.sent;
            console.log('req.user: ', req.user);
            res.render('home', {
              pageTitle: 'Home',
              videos: videos
            }); // try done.

            _context.next = 12;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            console.error(_context.t0);
            res.render('home', {
              pageTitle: 'Home',
              videos: []
            });

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 8]]);
  }));

  return function home(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.home = home;

var search = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var searchingBy, videos;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            searchingBy = req.query.term;
            videos = [];
            _context2.prev = 2;
            _context2.next = 5;
            return _Video["default"].find({
              title: {
                $regex: searchingBy,
                $options: 'i'
              }
            });

          case 5:
            videos = _context2.sent;
            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](2);
            console.log("search \uC5D0\uB7EC \uBC1C\uC0DD: ".concat(_context2.t0));

          case 11:
            res.render('search', {
              pageTitle: 'Search',
              searchingBy: searchingBy,
              videos: videos
            });

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 8]]);
  }));

  return function search(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}(); // videoRouter.js


exports.search = search;

var video = function video(req, res) {
  return res.render('videos', {
    pageTitle: 'Videos'
  });
};

exports.video = video;

var getUpload = function getUpload(req, res) {
  return res.render('upload', {
    pageTitle: 'Upload'
  });
};

exports.getUpload = getUpload;

var postUpload = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var _req$body, title, description, location, newVideo;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            console.log('upload post');
            _req$body = req.body, title = _req$body.title, description = _req$body.description, location = req.file.location;
            console.log(req.file);
            _context3.next = 5;
            return _Video["default"].create({
              fileUrl: location,
              title: title,
              description: description,
              creator: req.user.id
            });

          case 5:
            newVideo = _context3.sent;
            req.user.videos.push(newVideo._id);
            req.user.save();
            res.redirect(_routes["default"].videoDetail(newVideo._id)); // To Do : Upload and save video

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function postUpload(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}(); // Video Detail


exports.postUpload = postUpload;

var videoDetail = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var id, _video;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            id = req.params.id;
            _context4.prev = 1;
            _context4.next = 4;
            return _Video["default"].findById(id).populate('creator').populate('comments');

          case 4:
            _video = _context4.sent;
            console.log("finded Video: ".concat(_video));
            res.render('videoDetail', {
              pageTitle: "".concat(_video.title, " | DDCtube"),
              video: _video
            });
            _context4.next = 13;
            break;

          case 9:
            _context4.prev = 9;
            _context4.t0 = _context4["catch"](1);
            console.log(_context4.t0);
            res.redirect(_routes["default"].home);

          case 13:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 9]]);
  }));

  return function videoDetail(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.videoDetail = videoDetail;

var getEditVideo = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var id, _video2;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            id = req.params.id;
            _context5.prev = 1;
            _context5.next = 4;
            return _Video["default"].findById(id);

          case 4:
            _video2 = _context5.sent;

            if (!(_video2.creator.id !== req.user.id)) {
              _context5.next = 9;
              break;
            }

            throw Error();

          case 9:
            res.render('editVideo', {
              pageTitle: 'Edit Video',
              video: _video2
            });

          case 10:
            _context5.next = 16;
            break;

          case 12:
            _context5.prev = 12;
            _context5.t0 = _context5["catch"](1);
            console.error(_context5.t0);
            res.redirect(_routes["default"].home);

          case 16:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 12]]);
  }));

  return function getEditVideo(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.getEditVideo = getEditVideo;

var postEditVideo = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var id, _req$body2, UpdateTitle, UpdateDescription;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            id = req.params.id, _req$body2 = req.body, UpdateTitle = _req$body2.UpdateTitle, UpdateDescription = _req$body2.UpdateDescription;
            _context6.prev = 1;
            _context6.next = 4;
            return _Video["default"].findOneAndUpdate({
              _id: id
            }, {
              title: UpdateTitle,
              description: UpdateDescription
            }, function () {
              console.log("".concat(id, " \uB370\uC774\uD130\uAC00 \uC5C5\uB370\uC774\uD2B8 \uB418\uC5C8\uC2B5\uB2C8\uB2E4."));
            });

          case 4:
            res.redirect(_routes["default"].videoDetail(id));
            _context6.next = 10;
            break;

          case 7:
            _context6.prev = 7;
            _context6.t0 = _context6["catch"](1);
            res.redirect(_routes["default"].home);

          case 10:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[1, 7]]);
  }));

  return function postEditVideo(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.postEditVideo = postEditVideo;

var deleteVideo = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var id, _video3;

    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            id = req.params.id;
            _context7.prev = 1;
            _context7.next = 4;
            return _Video["default"].findById(id);

          case 4:
            _video3 = _context7.sent;

            if (!(_video3.creator.id !== req.user.id)) {
              _context7.next = 9;
              break;
            }

            throw Error();

          case 9:
            _context7.next = 11;
            return _Video["default"].findOneAndDelete({
              _id: id
            }, function () {
              console.log("".concat(id, " \uC694\uC18C\uAC00 \uC0AD\uC81C\uB418\uC5C8\uC2B5\uB2C8\uB2E4."));
            });

          case 11:
            _context7.next = 16;
            break;

          case 13:
            _context7.prev = 13;
            _context7.t0 = _context7["catch"](1);
            console.error("deleteVideo \uC5D0\uB7EC \uBC1C\uC0DD: ".concat(_context7.t0));

          case 16:
            res.redirect(_routes["default"].home);

          case 17:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[1, 13]]);
  }));

  return function deleteVideo(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}(); //


exports.deleteVideo = deleteVideo;

var postRegisterView = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
    var id, _video4;

    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            id = req.params.id;
            _context8.prev = 1;
            _context8.next = 4;
            return _Video["default"].findById(id);

          case 4:
            _video4 = _context8.sent;
            _video4.views += 1;

            _video4.save();

            res.status(200);
            _context8.next = 13;
            break;

          case 10:
            _context8.prev = 10;
            _context8.t0 = _context8["catch"](1);
            res.status(400);

          case 13:
            _context8.prev = 13;
            res.end();
            return _context8.finish(13);

          case 16:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[1, 10, 13, 16]]);
  }));

  return function postRegisterView(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();

exports.postRegisterView = postRegisterView;

var postAddComment = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(req, res) {
    var id, comment, user, _video5, newComment;

    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            id = req.params.id, comment = req.body.comment, user = req.user;
            console.log('postAddComment: ', comment);
            _context9.prev = 2;
            _context9.next = 5;
            return _Video["default"].findById(id);

          case 5:
            _video5 = _context9.sent;
            _context9.next = 8;
            return _Comment["default"].create({
              text: comment,
              creator: user.id
            });

          case 8:
            newComment = _context9.sent;
            console.log(newComment);

            _video5.comments.push(newComment._id);

            _video5.save();

            _context9.next = 17;
            break;

          case 14:
            _context9.prev = 14;
            _context9.t0 = _context9["catch"](2);
            res.status(400);

          case 17:
            _context9.prev = 17;
            res.end();
            return _context9.finish(17);

          case 20:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[2, 14, 17, 20]]);
  }));

  return function postAddComment(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();

exports.postAddComment = postAddComment;

var postDeleteComment = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(req, res) {
    var id, user, _video6;

    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            id = req.params.id, user = req.user;
            _context10.prev = 1;
            _context10.next = 4;
            return _Video["default"].findById(id);

          case 4:
            _video6 = _context10.sent;
            _context10.next = 9;
            break;

          case 7:
            _context10.prev = 7;
            _context10.t0 = _context10["catch"](1);

          case 9:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, null, [[1, 7]]);
  }));

  return function postDeleteComment(_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}();

exports.postDeleteComment = postDeleteComment;