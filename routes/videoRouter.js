import express from 'express';
import routes from '../routes';
import { videoDetail, deleteVideo, getUpload, postUpload, postEditVideo, getEditVideo } from '../controllers/videoController';
import { uploadVideo } from '../middlewares/middlewares';

const videoRouter = express.Router();



videoRouter.get(routes.upload, getUpload);
videoRouter.post(routes.upload, uploadVideo, postUpload);

videoRouter.get(routes.videoDetail(), videoDetail);

videoRouter.post(routes.editVideo(), postEditVideo);
videoRouter.get(routes.editVideo(), getEditVideo);

videoRouter.get(routes.deleteVideo(),  deleteVideo);


export default videoRouter;

