const express = require("express");
const { Instructor } = require("../models/instructor");
const router = express.Router();


router.get("/:id", async(req, res) => {

    let courses;
    await Instructor.findOne({ 'courses._id': req.params.id }, { name: 1, 'courses._id': 1, 'courses.title': 1, 'courses.category': 1, 'courses.language': 1, 'courses.section': 1 })
        .exec()
        .then((result) => {

            let val = result;
            let instructor = { _id: val._id, name: val.name };
            val.courses.forEach(course => {
                if (course._id == req.params.id)
                    courses = { _id: course._id, title: course.title, category: course.category, language: course.language, instructor, section: course.section };

            })

            res.status(200).json(courses);
        })
        .catch((err) => {
            res.status(500).json({
                message: err.message || "Error Occurred",
            });
        });
});

router.get("/", async(req, res) => {

    let courses = [];
    await Instructor.find({}, { name: 1, 'courses._id': 1, 'courses.title': 1, 'courses.category': 1, 'courses.language': 1 })
        .then((result) => {

            for (let [index, val] of result.entries()) {
                let instructor = { _id: val._id, name: val.name };
                val.courses.forEach(course => {
                    courses.push({ _id: course._id, title: course.title, category: course.category, language: course.language, instructor });
                })
            }
            res.status(200).json({ data: courses });
        })
        .catch((err) => {
            res.status(500).json({
                message: err.message || "Error Occurred",
            });
        });
});

module.exports = router;