const bcrypt = require("bcrypt");
const _ = require("lodash");
const { Instructor, validateInstructor } = require("../models/instructor");
const { Student, validateStudent } = require("../models/student");
const express = require("express");
const router = express.Router();

router.post("/", async(req, res) => {

    if (req.body.account.role == "Instructor") {

        const { error } = validateInstructor(req.body);
        if (error) return res.status(400).json({
            "error": {
                "code": "400",
                "message": error.details[0].message
            }
        });

        let instructor = await Instructor.findOne({ "account.email": req.body.account.email });
        if (instructor) return res.status(400).json({
            "error": {
                "code": "400",
                "message": "User already registered."
            }
        });

        instructor = new Instructor(_.pick(req.body, ["name", "gender", "dob", "account", "courses"]));
        const salt = await bcrypt.genSalt(10);
        instructor.account.password = await bcrypt.hash(instructor.account.password, salt);

        await instructor.save();

        const token = instructor.generateAuthToken();
        res
            .header("x-auth-token", token)
            .json({
                "data": _.pick(instructor, ["_id", "name"])
            });

    } else if (req.body.account.role == "Student") {
        const { error } = validateStudent(req.body);
        if (error) return res.status(400).json({
            "error": {
                "code": "400",
                "message": error.details[0].message
            }
        });

        let student = await Student.findOne({ "account.email": req.body.account.email });
        if (student) return res.status(400).json({
            "error": {
                "code": "400",
                "message": "User already registered."
            }
        });

        student = new Student(_.pick(req.body, ["name", "gender", "dob", "account", "courses"]));
        const salt = await bcrypt.genSalt(10);
        student.account.password = await bcrypt.hash(student.account.password, salt);

        await student.save();

        const token = student.generateAuthToken();
        res
            .header("x-auth-token", token)
            .json({
                "data": _.pick(student, ["_id", "name"])
            });

    }

});

module.exports = router;