import routes from "../routes";

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = 'DDCtube';
  res.locals.routes = routes;
  
  return next();
};
