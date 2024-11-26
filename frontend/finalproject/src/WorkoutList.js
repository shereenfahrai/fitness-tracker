import React, { useState, useEffect } from 'react';
import { Form, Button, Table } from 'react-bootstrap';

const WorkoutList = ({ workouts, setWorkouts }) => {
    const [workoutId, setWorkoutId] = useState('');
    const [exerciseId, setExerciseId] = useState('');
    const [exerciseName, setExerciseName] = useState('');
    const [sets, setSets] = useState('');
    const [repetitions, setRepetitions] = useState('');
    const [weight, setWeight] = useState('');
    const [editWorkout, setEditWorkout] = useState(false);
    const [editExercise, setEditExercise] = useState(false);
    const [workoutName, setWorkoutName] = useState('');
    const [workoutDate, setWorkoutDate] = useState('');
    const [filterName, setFilterName] = useState('');
    const [filteredWorkouts, setFilteredWorkouts] = useState([]);

    const hostname = "http://localhost:5236";

    useEffect(() => {
        getWorkouts();
    }, []);

    const getWorkouts = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            return;
        }
        const response = await fetch(hostname + "/workouts", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        setWorkouts(data);
    }




    const editWorkoutForm = async (workout) => {
        setEditWorkout(true);
        setWorkoutId(workout.workoutId);
        setWorkoutName(workout.name);
        setWorkoutDate(workout.date);
    }

    const editExerciseForm = async (exercise) => {
        setEditExercise(true);
        setWorkoutId(exercise.workoutId);
        setExerciseId(exercise.exerciseId);
        setExerciseName(exercise.name);
        setSets(exercise.sets);
        setRepetitions(exercise.repetitions);
        setWeight(exercise.weight);
    }

    // edit workout details
    const submitWorkout = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const response = await fetch(hostname + `/editworkout?workoutId=${workoutId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                workoutId: workoutId,
                name: workoutName,
                date: workoutDate
            })
        });
        const data = await response.json();
        // response from backend is the updated workout data
        const index = workouts.findIndex(workout => workout.workoutId === workoutId);
        workouts[index] = data;
        setWorkouts([...workouts]);
        setEditWorkout(false);
        getWorkouts(); // refresh workouts (possible date changes)
    }

    // edit exercise details
    const submitExercise = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const response = await fetch(hostname + `/editexercise?workoutId=${workoutId}&exerciseId=${exerciseId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                workoutId: workoutId,
                exerciseId: exerciseId,
                name: exerciseName,
                sets: sets,
                repetitions: repetitions,
                weight: weight
            })
        });
        const data = await response.json();
        // Response from backend is the updated exercise data
        const index = workouts.findIndex(workout => workout.workoutId === workoutId);
        const exerciseIndex = workouts[index].exercises.findIndex(exercise => exercise.exerciseId === exerciseId);
        workouts[index].exercises[exerciseIndex] = data;
        setWorkouts([...workouts]);
        setEditExercise(false);
    }

    // Filter workouts by name
    const filterWorkouts = (e) => {
        e.preventDefault();
        const filtered = workouts.filter(workout =>
            workout.name.toLowerCase().includes(filterName.toLowerCase())
        );
        setFilteredWorkouts(filtered);
    };

    const clearFilter = () => {
        setFilterName('');
        setFilteredWorkouts([]);
    };

    // Display filtered workouts or all workouts if no filter is applied
    const displayedWorkouts = filterName ? filteredWorkouts : workouts;

    return (
        <div>
            <h2>Workout History</h2>
            <Form onSubmit={filterWorkouts}>
                <Form.Group>
                    <Form.Label>Filter by Workout Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter workout name"
                        value={filterName}
                        onChange={(e) => setFilterName(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Filter
                </Button>
                <Button variant="secondary" onClick={clearFilter}>
                    Clear Filter
                </Button>
            </Form>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Workout Name</th>
                        <th>Date</th>
                        <th>Exercises</th>
                    </tr>
                </thead>
                <tbody>
                    {displayedWorkouts.map(workout =>
                        <tr key={workout.workoutId}>
                            <td>{workout.name}</td>
                            <td>{new Date(workout.date).toISOString().split("T")[0]}</td>
                            <td>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Exercise Name</th>
                                            <th>Sets</th>
                                            <th>Repetitions</th>
                                            <th>Weight</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {workout.exercises.map(exercise =>
                                            <tr key={exercise.exerciseId}>
                                                <td>{exercise.name}</td>
                                                <td>{exercise.sets}</td>
                                                <td>{exercise.repetitions}</td>
                                                <td>{exercise.weight}</td>
                                                <td>
                                                    <Button variant="primary" onClick={() => editExerciseForm(exercise)}>Edit</Button>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                                <Button variant="primary" onClick={() => editWorkoutForm(workout)}>Edit Workout</Button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
            {editWorkout &&
                <Form onSubmit={submitWorkout}>
                    <Form.Group>
                        <Form.Label>Workout Name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Enter workout name"
                            value={workoutName}
                            onChange={(e) => setWorkoutName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Workout Date</Form.Label>
                        <Form.Control
                            required
                            type="date"
                            value={new Date(workoutDate).toISOString().split("T")[0]}
                            onChange={(e) => setWorkoutDate(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            }
            {editExercise &&
                <Form onSubmit={submitExercise}>
                    <Form.Group>
                        <Form.Label>Exercise Name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Enter exercise name"
                            value={exerciseName}
                            onChange={(e) => setExerciseName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Sets</Form.Label>
                        <Form.Control
                            required
                            type="number"
                            placeholder="Enter number of sets"
                            value={sets}
                            onChange={(e) => setSets(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Repetitions</Form.Label>
                        <Form.Control
                            required
                            type="number"
                            placeholder="Enter number of repetitions"
                            value={repetitions}
                            onChange={(e) => setRepetitions(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Weight</Form.Label>
                        <Form.Control
                            required
                            type="number"
                            placeholder="Enter weight in pounds"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            }
        </div>
    );
}

export default WorkoutList;