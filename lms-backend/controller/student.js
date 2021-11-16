const express = require("express")
const router = express.Router();
const {Student} =require("../models/student")


// router.get('/student/student:id/course', async (req, res) =>{
//     const {studentId} = req.param;
    
//     await req.db.find({_id: studentId})
// })

router.get('/:studentId', async(req,res,next)=>{
    const { studentId } = req.params;
    const student = await Student.findById(studentId).exec()
    .then((student) => {
        if (!student) {
          return res.status(404).send({
            message: "User not found with id " + req.params.id,
          });
        }
        res.status(200).send(student);
        console.log(student);
      }).clone()
      .catch((err) => {
        return res.status(500).send({
          message: "Error retrieving user with id " + req.params.id,
        });
      });
})

router.post("/:studentId/courses", async (req, res, next) => {
   try{
    const { studentId } = req.params;
  
  await Student.findByIdAndUpdate(
    studentId,
    { $push: { courses: req.body } },
    function (err, data) {
      if (err) {
        console.log(err);
      } else {
        res.send(data);
        console.log("Data updated!");
      }
    }

  );
  }
  catch (err) {
    next(err)
    //  res.status(500).json({error:'There was a Server Side Error!'})
  }
});

//get all courses of an instructor
router.get("/:studentId/courses", async (req, res, next) => {
  const { studentId } = req.params;
  await Student.findById(studentId, { courses: 1 })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error Occurred",
      });
    });
});


module.exports = router;