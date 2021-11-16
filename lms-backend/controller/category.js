const express = require("express");
const { Category } = require("../models/category");
const router = express.Router();

router.get('/', async(req, res) => {
    // await Category.find({}, function(err, result) {
    //     if (err) {
    //       console.log(err);
    //     } else {
    //       res.json(result);
    //     }
    //   });
    await Category.find({}).exec()
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Error Occurred",
            });
        });
})



module.exports = router;