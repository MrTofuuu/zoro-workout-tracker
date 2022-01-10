const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    exercises: [
        {
            type: {
                type: String,
                required: 'Type of workout'
            },
            name: {
                type: String,
                required: 'Name of workout'
            },
            sets: {
                type: Number,
                required: 'Number of sets'
            },
            reps: {
                type: Number,
                required: 'Number of reps'
            },
            duration: {
                type: Number,
                required: 'Duration of workout'
            },
            weight: {
                type: Number,
                required: 'Weight of workout'
            },
            distance: {
                type: Number,
                required: 'Distance of workout'
            }, 
        }
    ],
    day: {
        type: Date,
        default: Date.now
    }
});

const Workout = mongoose.model("Workout", WorkoutSchema);
module.exports = Workout;