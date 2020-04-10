"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// Global
var HOME = '/';
var JOIN = '/join';
var LOGIN = '/login';
var LOGOUT = '/logout';
var SEARCH = '/search';
var ME = '/me'; // Users

var USERS = '/users';
var USER_DETAIL = '/:id';
var EDIT_PROFILE = '/edit-profile';
var CHANGE_PASSWORD = '/change-password'; // Videos

var VIDEOS = '/videos';
var UPLOAD = '/upload';
var VIDEO_DETAIL = '/:id';
var EDIT_VIDEO = '/:id/edit';
var DELETE_VIDEO = '/:id/delete'; // Github

var GITHUB = '/auth/github';
var GITHUB_CALLBACK = '/auth/github/callback'; // Facebook

var FACEBOOK = '/auth/facebook';
var FACEBOOK_CALLBACK = '/auth/facebook/callback'; // Kakao

var KAKAO = '/auth/kakao';
var KAKAO_CALLBACK = '/auth/kakao/callback'; // API

var API = '/api';
var REGISTER_VIEW = '/:id/view';
var ADD_COMMENT = '/:id/comment';
var DELETE_COMMENT = '/:id/comment-delete';
var routes = {
  home: HOME,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  search: SEARCH,
  users: USERS,
  userDetail: function userDetail(id) {
    if (id) {
      return "/users/".concat(id);
    }

    console.log('id not found');
    return USER_DETAIL;
  },
  editProfile: EDIT_PROFILE,
  changePassword: CHANGE_PASSWORD,
  videos: VIDEOS,
  upload: UPLOAD,
  videoDetail: function videoDetail(id) {
    if (id) {
      return "/videos/".concat(id);
    }

    return VIDEO_DETAIL;
  },
  editVideo: function editVideo(id) {
    if (id) {
      return "/videos/".concat(id, "/edit");
    }

    return EDIT_VIDEO;
  },
  deleteVideo: function deleteVideo(id) {
    if (id) {
      return "/videos/".concat(id, "/delete");
    }

    return DELETE_VIDEO;
  },
  github: GITHUB,
  githubCallback: GITHUB_CALLBACK,
  facebook: FACEBOOK,
  facebookCallback: FACEBOOK_CALLBACK,
  kakao: KAKAO,
  kakaoCallback: KAKAO_CALLBACK,
  me: ME,
  api: API,
  registerView: REGISTER_VIEW,
  addComment: ADD_COMMENT,
  deleteComment: DELETE_COMMENT
};
var _default = routes;
exports["default"] = _default;