const express = require("express");
const { Instructor } = require("../models/instructor");
const { uploadVideo } = require("../middleware/uploadVideo");
const router = express.Router();
const fs = require("fs");
const path = require("path");

// const multer = require("multer");

//get all courses of an instructor
router.get("/:teacherId/courses", async(req, res, next) => {
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


router.post("/:teacherId/courses/:courseId/sections", uploadVideo, async function(req, res, next) {

    const { teacherId, courseId } = req.params;
    try {

        const { files } = req;
        const { title, content } = req.body;

        let section = [];

        for (let i = 0; i < title.length; i++) {
            console.log(files);
            if (files[i] != undefined)
                section.push({ number: i + 1, title: title[i], content: files[i].filename + '.' + files[i].extension });
            else
                section.push({ number: i + 1, title: title[i], content });
        }

        await Instructor.updateOne({ _id: teacherId, "courses._id": courseId }, {
                "courses.$.section": section
            },
            function(err, data) {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ err: err.message });
                } else {
                    return res.status(200).json({ data });
                }
            }
        ).clone();

    } catch (err) {
        next(new Error())
    }
});

// post/add course
router.post("/:teacherId/courses", async(req, res, next) => {
    const { teacherId } = req.params;
    // try {
    //   await Instructor.updateOne({_id:teacherId},{$push:{courses:req.body}});
    // } catch (error) {
    //   next(error)
    // }
    try {
        return await Instructor.findByIdAndUpdate(
            teacherId, { $push: { courses: req.body } },
            function(err, data) {
                if (err) {
                    console.log(err);
                } else {
                    res.send(data);
                    console.log("Data updated!");
                }
            }
        );
    } catch (error) {
        // next(error)
    }
});

router.post("/:teacherId/courses", async(req, res, next) => {
    const { teacherId } = req.params;
    // try {
    //   await Instructor.updateOne({_id:teacherId},{$push:{courses:req.body}});
    // } catch (error) {
    //   next(error)
    // }
    await Instructor.findByIdAndUpdate(
        teacherId, { $push: { courses: req.body } },
        function(err, data) {
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
router.delete("/:teacherId/courses/:courseId", async(req, res, next) => {
    const { teacherId, courseId } = req.params;
    await Instructor.updateOne({ _id: teacherId, "courses._id": courseId }, { $pull: { courses: { _id: courseId } } },
        function(err, data) {
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
router.put("/:teacherId/course/:courseId", async(req, res, next) => {
    const { teacherId, courseId } = req.params;
    await Instructor.updateOne({ _id: teacherId, "courses._id": courseId }, { $set: { courses: { _id: req.body } } },
        function(err, data) {
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

router.get("/:teacherId/courses/:courseId/sections", async(req, res, next) => {
    try {
        const { teacherId, courseId } = req.params;
        Instructor.find({ _id: teacherId, 'courses._id': courseId }, { 'courses.section': 1 }, function(err, data) {
            if (err) {
                console.log(err);
            } else {
                res.send(data[0].courses[0].section);
            }
        })
    } catch (err) {
        console.log(err.message);
        next(new Error())
    }

});

router.get("/:teacherId/courses/:courseId/sections/:sectionId", async(req, res, next) => {
    try {
        const { teacherId, courseId } = req.params;
        Instructor.find({ _id: teacherId, 'courses._id': courseId }, { 'courses.section': 1 }, function(err, data) {
            if (err) {
                console.log(err);
            } else {
                res.send(data[0].courses[0].section);
            }
        })
    } catch (err) {
        console.log(err.message);
        next(new Error())
    }

});


//delete sections for a specific course for a specific instructor
router.delete(
    "/:teacherId/courses/:courseId/sections/:sectionId",
    async(req, res, next) => {
        const { teacherId, courseId, sectionId } = req.params;

        await Instructor.updateOne({ _id: teacherId, "courses._id": courseId }, { $pull: { "courses.$.section": { _id: sectionId } } },
            function(err, data) {
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

router.get("/courses/", async(req, res) => {

    const { courseName } = req.query;

    await Instructor.find({ 'courses.title': { $regex: courseName } }, { courses: 1 })
        .then((result) => {
            console.log(result)
            return res.status(200).send(result);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Error Occurred",
            });
        });
});

router.get("/video", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

router.get("/video/:videoName", function(req, res) {

    const path = `uploads/${req.params.videoName}`; // .mp4
    const stat = fs.statSync(path)
    const fileSize = stat.size
    const range = req.headers.range

    if (range) {
        const parts = range.replace(/bytes=/, "").split("-")
        const start = parseInt(parts[0], 10)
        const end = parts[1] ?
            parseInt(parts[1], 10) :
            fileSize - 1

        const chunkSize = (end - start) + 1
        const file = fs.createReadStream(path, { start, end })
        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunkSize,
            'Content-Type': 'video/mp4',
        }

        res.writeHead(206, head)
        file.pipe(res)
    } else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        }
        res.writeHead(200, head)
        fs.createReadStream(path).pipe(res)
    }

    //     // Ensure there is a range given for the video
    //     const range = '323324'; //req.headers.range;
    //     if (!range) {
    //         res.status(400).send("Requires Range header");
    //     }

    //     // get video stats (about 61MB)
    //     const videoPath = path.join(
    //         __dirname,
    //         "..",
    //         "uploads",
    //         `${req.params.videoName}.mp4`
    //     );
    //     const videoSize = fs.statSync(videoPath).size;

    //     // Parse Range
    //     // Example: "bytes=32324-"
    //     const CHUNK_SIZE = 10 ** 6; // 1MB
    //     const start = Number(range.replace(/\D/g, ""));
    //     const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

    //     // Create headers
    //     const contentLength = end - start + 1;
    //     const headers = {
    //         "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    //         "Accept-Ranges": "bytes",
    //         "Content-Length": contentLength,
    //         "Content-Type": "video/mp4",
    //     };

    //     // HTTP Status 206 for Partial Content
    //     res.writeHead(206, headers);

    //     // create video read stream for this particular chunk
    //     const videoStream = fs.createReadStream(videoPath, { start, end });

    //     // Stream the video chunk to the client
    //     videoStream.pipe(res);
});

//instructor profile
router.get("/:teacherId", async(req, res, next) => {
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