/* eslint-disable no-else-return */
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


export const githubLogin = passport.authenticate('github');

export const postGithubLogin = (req, res) => {
  res.redirect(routes.home);
};

export const logout = (req, res) => {
  // To Do : Process Log Out 
  console.log('logout prcessed');
  req.logout();
  res.redirect(routes.home);
};

export const githubLoginCallback = async (accessToken, refreshToken, profile, cb) => {
  console.log(profile);
  const {
    _json: {
      id, avatar_url: avatarUrl, name, email,
    },
  } = profile;
  
  try {
    const user = await User.findOne({ email });
    console.log(user);
    if (user) {
      user.githubId = id;
      user.avatarUrl = avatarUrl;
      user.save();
      return cb(null, user);
    } 
    const newUser = await User.create({
      email,
      name,
      githubId: id,
      avatarUrl,
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export const facebookLogin = passport.authenticate('facebook');

export const facebookLoginCallback = (acessToken, refreshToken, profile, cb) => {
  console.log(acessToken, refreshToken, profile, cb);
};

export const postFacebookLogin = (req, res) => {
  res.redirect(routes.home);
};

export const kakaoLogin = passport.authenticate('kakao');

export const kakaoLoginCallback = async (accessToken, refreshToken, profile, done) => {
  const { username, id } = profile;
  const {
    _json: {
      properties: {
        profile_image: avatarUrl,
      },
      kakao_account: {
        email,
      },
    }, 
  } = profile;

  try {
    const user = await User.findOne({ email });
    if (user) {
      user.kakaoId = id;
      user.avatarUrl = avatarUrl;
      user.save();
      return done(null, user);
    }
    const newUser = await User.create({
      email,
      name: username,
      kakaoId: id,
      avatarUrl,
    });
    return done(null, newUser);
  } catch (error) {
    console.log(`kakao login error: ${error}`);
    return done(error);
  }
};

export const postKakaoLogin = (req, res) => {
  res.redirect(routes.home);
};

export const getMe = (req, res) => {
  console.log(`req.user id: ${req.user.id}`);
  res.render('userDetail', { pageTitle: 'User Detail', user: req.user });
};


export const userDetail = async (req, res) => {
  const { params: { id } } = req;
  console.log(`param id: ${id}`);
  try {
    const user = await User.findById(id);
    console.log(user);
    res.render('userDetail', { pageTitle: 'User Detail', user });
  } catch (error) {
    console.error(error);
    res.redirect(routes.home);
  }
};


export const users = (req, res) => res.render('users', { pageTitle: 'Users' });
export const editProfile = (req, res) => res.render('editProfile', { pageTitle: 'Edit Profile' });
export const changePassword = (req, res) => res.render('changePassword', { pageTitle: 'Change Password' });
