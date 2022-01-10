const router = require("express").Router();
const Workout = require("../models/Workout");

//api route to get workouts
router.get("/api/workouts", (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration:
          { $sum: '$exercises.duration' },
      }
    }
  ])
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

//api route to get workout range
router.get("/api/workouts/range", (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration:
          { $sum: '$exercises.duration' },
        totalWeight:
          { $sum: '$exercises.weight' }
      }
    }
  ])
    .sort({day:-1})
    .limit(7)
    .then(dbWorkout => {
      res.json(dbWorkout.reverse());
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

//api route to create new workout
router.post("/api/workouts", ({ body }, res) => {
  Workout.create(body)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

//api route to update workouts using the id
router.put("/api/workouts/:id", ({ body, params }, res) => {
  Workout.findByIdAndUpdate(
    { _id: params.id },
    { $push: { exercises: body } },
    { new: true }
  )
  .then(dbWorkout => {
    res.json(dbWorkout);
  })
  .catch(err => {
    res.status(400).json(err);
  });
});

module.exports = router;