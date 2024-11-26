import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavHeader = () => {
    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/">Fitness Tracker</Navbar.Brand>
            <Nav className="mr-auto">
                <Link to="/login" className="nav-link">Login</Link>
                <Link to="/workouts" className="nav-link">Add Workouts</Link>
                <Link to="/history" className="nav-link">Workout History</Link>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            </Nav>
        </Navbar>
    );
}

const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
};


export default NavHeader;