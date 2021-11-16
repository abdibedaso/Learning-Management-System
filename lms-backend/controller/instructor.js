const express = require("express");
const { Instructor } = require("../models/instructor");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const multer = require("multer");

//get all courses of an instructor
router.get("/:teacherId/courses", async (req, res, next) => {
  const { teacherId } = req.params;
  await Instructor.findById(teacherId, { courses: 1 })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error Occurred",
      });
    });
});

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Uploads is the Upload_folder_name
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + ".mp4");
    // return file.fieldname + "-" + Date.now() + ".mp4";
  },
});

// Define the maximum size for uploading
// picture i.e. 1 MB. it is optional
const maxSize = 1 * 1000 * 1000;

var upload = multer({
  storage: storage,
  limits: { fileSize: maxSize },
  fileFilter: function (req, file, cb) {
    // Set the filetypes, it is optional
    return cb(null, true);
  },
  // video is the name of file attribute
}).single("video");

router.post(
  "/:teacherId/courses/:courseId/sections",
  async function (req, res, next) {
    // Error MiddleWare for multer file upload, so if any
    // error occurs, the image would not be uploaded!
    const { teacherId, courseId } = req.params;
    upload(req, res, async function (err) {
      // if (err) {
      //   // ERROR occured (here it can be occured due
      //   // to uploading image of size greater than
      //   // 1MB or uploading different file type)
      //   res.send(err);
      // } else {
      //   // SUCCESS, image successfully uploaded
      //   res.send("Success, Image uploaded!");
      // }
      console.log(req.body);
      await Instructor.updateOne(
        { _id: teacherId, "courses._id": courseId },
        { $push: { "courses.$.section": req.body } },
        function (err, data) {
          if (err) {
            console.log(err);
          } else {
            res.send(data);
            console.log("Data updated!");
          }
        }
      ).clone();
    });

    // const section = {
    //   number : req.body.number,
    //     title : req.body.title,
    //     content : upload.storage.filename
    // }
    // console.log(section)
  }
);

// post/add course
router.post("/:teacherId/courses", async (req, res, next) => {
  const { teacherId } = req.params;
  // try {
  //   await Instructor.updateOne({_id:teacherId},{$push:{courses:req.body}});
  // } catch (error) {
  //   next(error)
  // }
  await Instructor.findByIdAndUpdate(
    teacherId,
    { $push: { courses: req.body } },
    function (err, data) {
      if (err) {
        console.log(err);
      } else {
        res.send(data);
        console.log("Data updated!");
      }
    }
  );
});

router.post("/:teacherId/courses", async (req, res, next) => {
  const { teacherId } = req.params;
  // try {
  //   await Instructor.updateOne({_id:teacherId},{$push:{courses:req.body}});
  // } catch (error) {
  //   next(error)
  // }
  await Instructor.findByIdAndUpdate(
    teacherId,
    { $push: { courses: req.body } },
    function (err, data) {
      if (err) {
        console.log(err);
      } else {
        res.send(data);
        console.log("Data updated!");
      }
    }
  );
});

//remove course from the teacher
router.delete("/:teacherId/courses/:courseId", async (req, res, next) => {
  const { teacherId, courseId } = req.params;
  await Instructor.updateOne(
    { _id: teacherId, "courses._id": courseId },
    { $pull: { courses: { _id: courseId } } },
    function (err, data) {
      if (err) {
        console.log(err);
      } else {
        res.send(data);
        console.log("Data updated!");
      }
    }
  );
});
// update course
router.put("/:teacherId/course/:courseId", async (req, res, next) => {
  const { teacherId, courseId } = req.params;
  await Instructor.updateOne(
    { _id: teacherId, "courses._id": courseId },
    { $set: { courses: { _id: req.body } } },
    function (err, data) {
      if (err) {
        console.log(err);
      } else {
        res.send(data);
        console.log("Data updated!");
      }
    }
  );
});

//add sections for a specific course for a specific instructor
/*router.post(
  "/:teacherId/courses/:courseId/sections",
  async (req, res, next) => {
    const { teacherId, courseId } = req.params;

    await Instructor.updateOne(
      { _id: teacherId, "courses._id": courseId },
      { $push: { "courses.$.section": req.body } },
      function (err, data) {
        if (err) {
          console.log(err);
        } else {
          res.send(data);
          console.log("Data updated!");
        }
      }
    );
  }
);
*/

router.get(
  "/:teacherId/courses/:courseId/sections",
  async (req, res, next) => {
    const { teacherId, courseId } = req.params;

    await Instructor.find({_id:teacherId,'courses._id':courseId},function (err, data) {
      if (err) {
        console.log(err);
      } else {
        res.send(data);
      }
    }
  )
  });


//delete sections for a specific course for a specific instructor
router.delete(
  "/:teacherId/courses/:courseId/sections/:sectionId",
  async (req, res, next) => {
    const { teacherId, courseId, sectionId } = req.params;

    await Instructor.updateOne(
      { _id: teacherId, "courses._id": courseId },
      { $pull: { "courses.$.section": { _id: sectionId } } },
      function (err, data) {
        if (err) {
          console.log(err);
        } else {
          res.send(data);
          console.log("Data updated!");
        }
      }
    );
  }
);

router.get("/courses/", async (req, res) => {

  const { courseName } = req.query;

  await Instructor.find({'courses.title':{$regex:courseName}},{courses:1})
    .then((result) => {
      res.status(200).send(result);
      console.log(result)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error Occurred",
      });
    });
});

router.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

router.get("/video/:videoName", function (req, res) {
  // Ensure there is a range given for the video
  const range = req.headers.range;
  if (!range) {
    res.status(400).send("Requires Range header");
  }

  // get video stats (about 61MB)
  const videoPath = path.join(
    __dirname,
    "..",
    "uploads",
    `${req.params.videoName}.mp4`
  );
  const videoSize = fs.statSync(videoPath).size;

  // Parse Range
  // Example: "bytes=32324-"
  const CHUNK_SIZE = 10 ** 6; // 1MB
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

  // Create headers
  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };

  // HTTP Status 206 for Partial Content
  res.writeHead(206, headers);

  // create video read stream for this particular chunk
  const videoStream = fs.createReadStream(videoPath, { start, end });

  // Stream the video chunk to the client
  videoStream.pipe(res);
});
//instructor profile
router.get("/:teacherId", async (req, res, next) => {
  const { teacherId } = req.params;
  const teacher = await Instructor.findById(teacherId)
    .exec()
    .then((teacher) => {
      if (!teacher) {
        return res.status(404).send({
          message: "User not found with id " + req.params.id,
        });
      }
      res.status(200).send(teacher);
      console.log(teacher);
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Error retrieving user with id " + req.params.id,
      });
    });
});

//all instructors
// router.get("/", async (req, res) => {
//   const teachers = await Instructor.find({});
//   try {
//     res.send(teachers);
//   } catch (error) {
//     response.status(500).send(error);
//   }
// });

module.exports = router;
