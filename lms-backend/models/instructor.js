const Joi = require('joi');
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let userSchema = Schema({
    email: String,
    password: String
});

let User = mongoose.model('User', userSchema);

const Instructor = mongoose.model('Instructor', new mongoose.Schema({
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
        Language: String,
        section: [{ title: String, number: Number, content: String }]
    }]

}));

function validateInstructor(instructor) {
    const schema = {
        name: Joi.string().max(50).required()
    };

    return Joi.validate(instructor, schema);
}

exports.User = User;
exports.Instructor = Instructor;
exports.validate = validateInstructor;