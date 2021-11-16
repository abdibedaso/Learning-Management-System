const multer = require('multer');
const upload = multer({
    dest: './uploads/',
    fileFilter: (req, file, next) => {

        let fileName = file.originalname.toLowerCase().split('.');
        let fileExtension = fileName[fileName.length - 1]
        file.extension = fileExtension;
        if (file.mimetype == "video/mp4") { // && fileExtension === 'mp4'
            req.originalname = file.originalname.toLowerCase();

            next(null, true);
        } else {
            next(null, false);
            return next(new Error('Only .mp4 format allowed!'));
        }

    },
    // limits: {
    //     fileSize: 20000000, // 20 Mb JPG
    // }
});

module.exports.uploadVideo = upload.single('content');


// var storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         // Uploads is the Upload_folder_name
//         cb(null, "uploads");
//     },
//     filename: function(req, file, cb) {
//         cb(null, file.fieldname + "-" + Date.now() + ".mp4");
//         // return file.fieldname + "-" + Date.now() + ".mp4";
//     },
// });

// // Define the maximum size for uploading
// // picture i.e. 1 MB. it is optional
// const maxSize = 1 * 1000 * 1000;

// var upload = multer({
//     storage: storage,
//     limits: { fileSize: maxSize },
//     fileFilter: function(req, file, cb) {
//         // Set the filetypes, it is optional
//         return cb(null, true);
//     },
//     // video is the name of file attribute
// }).single("video");

// upload(req, res, async function(err) {
//     // if (err) {
//     //   // ERROR occured (here it can be occured due
//     //   // to uploading image of size greater than
//     //   // 1MB or uploading different file type)
//     //   res.send(err);
//     // } else {
//     //   // SUCCESS, image successfully uploaded
//     //   res.send("Success, Image uploaded!");
//     // }

// });