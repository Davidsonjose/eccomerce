const Post = require("../models/Post");
const upload = require('../util/upload');
// const {ApiError} = require('../util/errorHandler')



exports.createPosts = (req, res, next) => {
  const ImageFile = upload.single("image");
  ImageFile(req, res, async (err) => {
    try {
      if (err) {
        return next(new Error(err));
      }
      const {body, file} = req;
      const data= {
        image: `upload/${file.filename}`,
        ...body
      }
      const savePost = await Post.create(data);
      res.status(201).json({
        status: 'created',
        data: savePost
      })
      // res.send({file: req.file, body: req.body})

    } catch (error) {
      return next(error);
    }
  });
  // const post = await Post.create({});
};  



exports.getAllPost = async (req, res, next) => {
  try {
    const getPost = await Post.find();
    res.status(200).json({
        status: 'success',
        getPost
    })
  } catch (error) {
    return next(new Error(error));
  }
};

exports.getSinglePost = async (req, res) => {
  const { id } = req.params;
  let singlePost = await Post.findById({ _id: id });
  res.status(200).json({
      status: "success",
      data: singlePost
  })
};



exports.logMethod = (req, res, next) =>{
    console.log(req.method , req.get('host') + '/' + req.url );
    next();
}