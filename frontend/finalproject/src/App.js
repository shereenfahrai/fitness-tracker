import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { Container } from 'react-bootstrap';
import NavHeader from './NavHeader';
import LoginForm from './LoginForm';
import WorkoutForm from './WorkoutForm';
import WorkoutList from './WorkoutList';


const App = () => {
  // maintain user's list of workouts
  const [workouts, setWorkouts] = useState([]);

  return (
    <Router>
      <NavHeader />
      <Routes>
        <Route path="/login" element={<LoginForm/>}></Route>
        <Route path="/workouts" element={<WorkoutForm workouts={workouts} setWorkouts={setWorkouts} />}></Route>
        <Route path="/history" element={<WorkoutList workouts={workouts} setWorkouts={setWorkouts} />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
