const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

const FILE = "./data/workouts.json";

app.get("/api/workouts", (req, res) => {
    const workouts = JSON.parse(fs.readFileSync(FILE));
    res.status(201).json(workouts);
});

app.post("/api/workouts", (req, res) => {
    const {date, excercise, duration, caloriesBurned} = req.body;

    if(!date || !excercise || !duration || !caloriesBurned){
        return res.status(400).json({error: "Enter the things correctly!"});
    }

    const newWorkouts = {
        id: Date.now(),
        date,
        excercise,
        duration,
        caloriesBurned
    };
    workouts.push(newWorkouts);
    fs.writeFileSync(FILE, JSON.stringify(workouts, null, 2));
    res.status(201).json(newWorkouts);

});

app.listen(PORT, () => (console.log(`Server is running on PORT ${PORT}`)));