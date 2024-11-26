import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const hostname = "http://localhost:5236";


    const login = async (e) => {
        e.preventDefault();
        const response = await fetch(hostname + "/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });
        // user will receive JWT token if login is successful
        // store JWT token in local storage
        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            // redirect to workout form page so that user can add workouts
            window.location.href = "/workouts";
        }
        else if (response.status === 404) {
            alert("User not found.");
        }
        else if (response.status === 401) {
            alert("Incorrect password.");
        }
    }

    const register = async (e) => {
        e.preventDefault();
        const response = await fetch(hostname + "/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });
        if (response.ok) {
            alert("User registered successfully. Please login.");
        }
        else if (response.status === 400) {
            alert("User already exists.");
        }

    }

    return (
        <div>
            <Form onSubmit={login}>
                <Form.Group controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                    required
                    type="text" 
                    placeholder="Enter username" 
                    onChange={(e) => setUsername(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                    required
                    type="password" 
                    placeholder="Password" 
                    onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>

            <Form onSubmit={register}>
                <Form.Group controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                    required
                    type="text" 
                    placeholder="Enter username" 
                    onChange={(e) => setUsername(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                    required
                    type="password" 
                    placeholder="Password" 
                    onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Register
                </Button>
            </Form>
        </div>


    );
}

export default LoginForm;