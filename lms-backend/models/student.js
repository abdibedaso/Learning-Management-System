const Joi = require('joi');
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let userSchema = Schema({
    email: String,
    password: String
});

let User = mongoose.model('User', userSchema);

const Student = mongoose.model('Student', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 50
    },
    gender: { type: String, enum: ["Male", "Female"] },
    dob: Date,
    user: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    courses: [{
        title: String,
        category: String,
        instructor: String,
        Language: String,
        progress: Number,
        section: { title: String, number: Number, progress: Number }
    }]

}));

function validateStudent(student) {
    const schema = {
        name: Joi.string().max(50).required()
    };

    return Joi.validate(student, schema);
}

exports.Student = Student;
exports.validate = validateStudent;