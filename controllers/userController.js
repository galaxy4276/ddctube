/* eslint-disable no-console */
/* eslint-disable indent */
import passport from 'passport';
import routes from '../routes';
import User from '../models/User';


export const getJoin = (req, res) => {
  res.render('join', { pageTitle: 'Join' });
};

export const postJoin = async (req, res, next) => {
  console.log(req.body);
  const {
    body: {
    name, email, password, password2, 
  },
  } = req;
  if (password !== password2) {
    res.status(400);
    res.render('join', { pageTitle: 'Join' });
  } else {
    // To Do: Register User
    try {
      const user = await User({
        name,
        email,
      }); // User Create는 데이터베이스 저장까지함. 그래서 데이터베이스에 이미있어서 이미가입되었다고 문제가 생길 법해서 User만 ㅆ줌. 
      await User.register(user, password);
      next();
    } catch (error) {
      console.log(error);
      res.redirect(routes.home);
    }
  }
};


export const getLogin = (req, res) => res.render('login', { pageTitle: 'Login' });

export const postLogin = passport.authenticate('local', { 
  failureRedirect: routes.login,
  successRedirect: routes.home,
});

export const githubLoginCallback = (accessToken, refreshToken, profile, cb) => {
  console.log(accessToken, refreshToken, profile, cb);
};


export const logout = (req, res) => {
  // To Do : Process Log Out 
  req.logout();
  res.redirect(routes.home);
};

// userRouter.js

export const users = (req, res) => res.render('users', { pageTitle: 'Users' });
export const editProfile = (req, res) => res.render('editProfile', { pageTitle: 'Edit Profile' });
export const changePassword = (req, res) => res.render('changePassword', { pageTitle: 'Change Password' });
export const userDetail = (req, res) => res.render('userDetail', { pageTitle: 'User Detail' });

