import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const WorkoutForm = ({ workouts, setWorkouts }) => {
    const [workoutName, setWorkoutName] = useState('');
    const [workoutDate, setWorkoutDate] = useState('');
    const [workoutId, setWorkoutId] = useState('');

    const [exerciseName, setExerciseName] = useState('');
    const [sets, setSets] = useState('');
    const [repetitions, setRepetitions] = useState('');
    const [weight, setWeight] = useState('');


    const hostname = "http://localhost:5236";

    const submitWorkout = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            alert("Please login to add workouts.");
            window.location.href = "/login";
            return;
        }
        const response = await fetch(hostname + "/addworkout", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name: workoutName,
                date: workoutDate
            })
        });
        // frontend receives new workout data from backend
        const data = await response.json();
        // update user's workouts
        setWorkoutId(data.workoutId);
        setWorkouts([...workouts, data]);
    }

    const submitExercise = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            alert("Please login to add exercises.");
            window.location.href = "/login";
            return;
        }
        const response = await fetch(hostname + `/addexercise?workoutId=${workoutId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name: exerciseName,
                sets: sets,
                repetitions: repetitions,
                weight: weight,
                workoutId: workoutId
            })
        });
        const data = await response.json();
        // update workout with new exercise data
        const updatedWorkouts = workouts.map(workout => {
            if (workout.workoutId === workoutId) {
                workout.exercises.push(data);
            }
            return workout;
        }
        );
        setWorkouts(updatedWorkouts);
        setExerciseName('');
        setSets('');
        setRepetitions('');
        setWeight('');
    }


    return (
        <div>
            <Form onSubmit={submitWorkout}>
                <Form.Group>
                    <Form.Label>Workout Name</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        value={workoutName}
                        placeholder="Enter workout name"
                        onChange={(e) => setWorkoutName(e.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Workout Date</Form.Label>
                    <Form.Control
                        required
                        type="date"
                        value={workoutDate}
                        onChange={(e) => setWorkoutDate(e.target.value)} />
                </Form.Group>
                <Button
                    variant="primary"
                    type="submit">
                    Submit
                </Button>
            </Form>
            <Form onSubmit={submitExercise}>
                <Form.Group>
                    <Form.Label>Exercise Name</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        value={exerciseName}
                        placeholder="Enter exercise name"
                        onChange={(e) => setExerciseName(e.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Sets</Form.Label>
                    <Form.Control
                        required
                        type="number"
                        value={sets}
                        placeholder="Enter number of sets"
                        onChange={(e) => setSets(e.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Repetitions</Form.Label>
                    <Form.Control
                        required
                        type="number"
                        value={repetitions}
                        placeholder="Enter number of repetitions"
                        onChange={(e) => setRepetitions(e.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Weight</Form.Label>
                    <Form.Control
                        required
                        type="number"
                        value={weight}
                        placeholder="Enter weight in pounds"
                        onChange={(e) => setWeight(e.target.value)} />
                </Form.Group>
                <Button
                    variant="primary"
                    type="submit"
                    >
                    Submit
                </Button>
            </Form>



        </div>
    );
}

export default WorkoutForm;