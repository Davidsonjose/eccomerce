const express = require("express");
const multer = require("multer");
const { getAllPost, getSinglePost, logMethod, createPosts } = require('../controllers/postController');
const { authorization } = require("../controllers/authController");


const router = express.Router();



router.use(logMethod);
router.get("/post",authorization, getAllPost);

// router.post("/post", (req, res) => {
//   let image = upload.single("image");
//   image(req, res, (err) => {
//     if (err) {
//       return new Error(error);
//     }
//     res.send({ file: req.file, body: req.body });
// });
// });
router.get('/:id', getSinglePost )

router.post("/create", createPosts);
// res.send({ file: req.file, body: req.body });
module.exports = router;


// upload.single("image"), async (req, res, next) => {
//   try {
//     const { file, body } = req;
//     const data = {
//       image: `upload/${file?.filename}`,
//       ...body,
//     };
//     const dataSave = await Post.create(data);
//     res.send(dataSave);
//   } catch (error) {
//     return next(new Error(error));
//   }
// }
