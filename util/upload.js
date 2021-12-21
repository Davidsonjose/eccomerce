const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
// const cloudinary = require('cloudinary').v2

//cloudinary config
// cloudinary.config({
//   cloud_name: "YOUR_CLOUD_NAME",
//   api_key: "YOUR_API_KEY",
//   api_secret: "YOUR_ API_SECRET",
// });

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

const upload = multer({
  storage,
  limits: { fileSize: 10000000 },
  fileFilter: (req, file, callback) => {
    let fileType = ["image/jpeg", "image/png"];
    if (!fileType.includes(file.mimetype)) {
      return callback(
        new Error("file type is not supported, upload jpeg, png or jpg")
      );
    }

    return callback(null, true);
  },
});

module.exports = upload;





