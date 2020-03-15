import routes from '../routes';
import Video from '../models/Video';

export const home = async (req, res) => {
  try {
    const videos = await Video.find({});
    console.log(videos);
//    for(let i = 0; i < videos.length; i++) {
//      console.log(`var to pug ${i+1} : ${videos[i]}`);
//    }
    res.render('home', { pageTitle: 'Home', videos }); // try done.
  } catch (error) {
    console.error(error);
    res.render('home', { pageTitle: 'Home', videos: [] });
  }

} 


export const search = (req, res) => {
  const {
    query: { term: searchingBy }
  } = req;
  
  res.render('search', { pageTitle: 'Search', searchingBy });
}


// videoRouter.js

export const video = (req, res) => res.render('videos', { pageTitle: 'Videos' });

export const getUpload = (req, res) => res.render('upload', { pageTitle: 'Upload' });

export const postUpload = async (req, res) => {
  console.log('upload post');
  const {
    body: { title, description },
    file: { path }
  } = req;
  const newVideo = await Video.create({
    fileUrl: path,
    title,
    description
  });
  console.log('createdVideo: ' + newVideo);
  res.redirect(routes.videoDetail(newVideo._id));
  // To Do : Upload and save video
}

export const videoDetail = (req, res) => res.render('videoDetail', { pageTitle: 'Video Detail' });

export const editVideo = (req, res) => res.render('editVideo', { pageTitle: 'Edit Video' });

export const deleteVideo = (req, res) => res.render('deleteVideo', { pageTitle: 'Delete Video' });  

