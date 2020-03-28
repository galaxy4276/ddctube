import express from 'express';
import routes from '../routes';
import {
    videoDetail, deleteVideo, getUpload, postUpload, postEditVideo, getEditVideo, 
} from '../controllers/videoController';
import { uploadVideo, onlyPrivate } from '../middlewares/middlewares';

const videoRouter = express.Router();



videoRouter.get(routes.upload, onlyPrivate, getUpload);
videoRouter.post(routes.upload, uploadVideo, onlyPrivate, postUpload);

videoRouter.get(routes.videoDetail(), videoDetail);

videoRouter.post(routes.editVideo(), onlyPrivate, postEditVideo);
videoRouter.get(routes.editVideo(), onlyPrivate, getEditVideo);

videoRouter.get(routes.deleteVideo(), onlyPrivate, deleteVideo);


export default videoRouter;

