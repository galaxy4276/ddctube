import multer from 'multer';
import routes from '../routes';


export const localsMiddleware = (req, res, next) => {
    res.locals.siteName = 'DDCtube';
    res.locals.routes = routes;
    console.log('req.user: ', req.user);
    res.locals.loggedUser = req.user || null;

    return next();
};

export const onlyPublic = (req, res, next) => {
    if (req.user) {
        res.redirect(routes.home);
    } else {
        next();
    }
};

export const onlyPrivate = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.redirect(routes.home);
    }
};

const multerVideo = multer({ dest: 'uploads/videos/' });


export const uploadVideo = multerVideo.single('videoFile');