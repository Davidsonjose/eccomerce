const Post = require("../models/Post");

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