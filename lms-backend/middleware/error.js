module.exports = function(err, req, res, next) {
    console.log(err.message, err);

    res.status(500).json({
        "error": {
            "code": "500",
            "message": "Something failed."
        }
    });
}