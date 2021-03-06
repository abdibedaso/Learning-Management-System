const Joi = require('joi');
const mongoose = require('mongoose');

const config = require("config");
const jwt = require("jsonwebtoken");

const instructorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 50
    },
    gender: { type: String, enum: ["Male", "Female"] },
    dob: Date,
    account: {
        email: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 255,
            unique: true
        },
        password: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 1024
        },
        role: {
            type: String,
            required: true
        }
    },
    courses: [{
        title: String,
        category: String,
        language: String,
        section: [{ title: String, number: Number, content: String }]
    }]

}, { timestamps: { uploadedAt: 'created_at' } });

instructorSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({
            _id: this._id,
            name: this.name,
            email: this.account.email,
            role: this.account.role
        },
        config.get("jwtPrivateKey")
    );
    return token;
};

function validateInstructor(instructor) {
    const schema = {
        name: Joi.string().max(50).required(),
        gender: Joi.string().max(50).optional(),
        dob: Joi.optional(),
        account: Joi.object().required(),
        courses: Joi.optional(),
    };

    return Joi.validate(instructor, schema);
}

const Instructor = mongoose.model("Instructor", instructorSchema);

exports.Instructor = Instructor;
exports.validateInstructor = validateInstructor;