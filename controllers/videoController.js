export const home = (req, res) => res.render('home', { pageTitle: 'Home' });

export const search = (req, res) => {
  // const { searchingBy } = req.query.term; // 작동안함.

  // const {
  //   query: { term: searchingBy }
  // } = req;

  const { term: searchingBy } = req.query;

  res.render('search', { pageTitle: 'Search', searchingBy: searchingBy });
}


// videoRouter.js

export const videos = (req, res) => res.render('videos', { pageTitle: 'Videos' });

export const upload = (req, res) => res.render('upload', { pageTitle: 'Upload' });

export const videoDetail = (req, res) => res.render('videoDetail', { pageTitle: 'Video Detail' });

export const editVideo = (req, res) => res.render('edit Video', { pageTitle: 'Edit Video' });

export const deleteVideo = (req, res) => res.render('deleteVideo', { pageTitle: 'Delete Video' });

