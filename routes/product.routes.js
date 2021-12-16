const express = require("express");
const multer = require("multer");
const path = require("path");
const Post = require("../models/Post");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    return callback(null, "upload/pictures");
  },
  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extname = path.extname(file.originalname);
    return callback(null, file.fieldname + "-" + uniqueSuffix + extname);
  },
});

const upload = multer({ storage, limits: { fileSize: 1000000 } });

const router = express.Router();

router.get("/post", async (req, res, next) => {
  try {
    const getPost = await Post.find();
    res.send(getPost);
    res.render("post/create.ejs", {
      title: "create post",
      getPost,
    });
  } catch (error) {
    return next(new Error(err));
  }
});

// router.post("/post", (req, res) => {
//   let image = upload.single("image");
//   image(req, res, (err) => {
//     if (err) {
//       return new Error(error);
//     }
//     res.send({ file: req.file, body: req.body });
// });
// });

router.post("/post", upload.single("image"), async (req, res, next) => {
  try {
    const { file, body } = req;
    const data = {
      image: `upload/${file?.filename}`,
      ...body,
    };
    const dataSave = await Post.create(data);
    res.send(dataSave);
  } catch (error) {
    return next(new Error(error));
  }
});
// res.send({ file: req.file, body: req.body });
module.exports = router;