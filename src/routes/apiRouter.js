import express from 'express';
import routes from '../routes';
import { postRegisterView, postAddComment } from '../controllers/videoController';

const apiRouter = express.Router();

apiRouter.post(routes.registerView, postRegisterView);
apiRouter.post(routes.addComment, postAddComment, () => {
    console.log('postAddComment processed');
});

export default apiRouter;




