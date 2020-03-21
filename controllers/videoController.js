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



// Video Detail 
export const videoDetail = async (req, res) => {

  const { 
    params: {id} 
  } = req;
  console.log(`id: ${id}`);
  try {
    const video = await Video.findById(id);
    console.log(`finded Video: ${video}`);
    res.render('videoDetail', { pageTitle:  `${video.title} | DDCtube` , video });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  };
}



export const getEditVideo = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id);
    console.log(`video _id: ${video._id}`);
    res.render('editVideo', { pageTitle: `Edit ${video.title}`, video });
  } catch (error) {
    console.error(error);
    res.redirect(routes.home);
  }
}

export const postEditVideo = async (req, res) => {
  const  {
    params: { id },
    body: { UpdateTitle, UpdateDescription }
  } = req;
  try {
      await Video.findOneAndUpdate({ _id: id }, { title: UpdateTitle, description: UpdateDescription }, () => {
        console.log(`${id} 데이터가 업데이트 되었습니다.`);
      });
      res.redirect(routes.videoDetail(id));  
  } catch (error) {
    res.redirect(routes.home);
  }
};


export const deleteVideo = async (req, res) => {
  const {
    params: { id }
  } = req;

  try {
    await Video.findOneAndDelete(id, () => { console.log(`${id} 요소가 삭제되었습니다.`)});
  } catch (err) {
    console.error(`deleteVideo 에러 발생: ${err}`);
  }
  res.redirect(routes.home);
}

