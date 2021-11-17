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

module.exports.uploadVideo = upload.array('content');