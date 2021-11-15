const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { Instructor } = require("../models/instructor");
const { Student } = require("../models/student");
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/', async(req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).json({
        "error": {
            "code": "400",
            "message": error.details[0].message
        }
    });

    let user = null;

    if (req.body.role == "Student") {
        user = await Student.findOne({ "account.email": req.body.email });
    } else if (req.body.role == "Instructor") {
        user = await Instructor.findOne({ "account.email": req.body.email });
    } else {
        return res.status(400).json({
            "error": {
                "code": "400",
                "message": "Role Not Found!"
            }
        });
    }

    if (!user) return res.status(400).send('Invalid email or password.');

    const validPassword = await bcrypt.compare(req.body.password, user.account.password);
    if (!validPassword) return res.status(400).json({
        "error": {
            "code": "400",
            "message": "Invalid email or password."
        }
    });

    const token = user.generateAuthToken();
    return res.send({
        "data": { token }
    });
});

function validate(req) {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
        role: Joi.string().required()
    };

    return Joi.validate(req, schema);
}

module.exports = router;