import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Login from './Login';
import Dashboard from './Dashboard';
import AdminDashboard from './AdminDashboard';

const App = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const [usn, setUsn] = useState('');
    const [admin, setAdmin] = useState(false);

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login setAuthenticated={setAuthenticated} setUsn={setUsn} setAdmin={setAdmin} />} />
                <Route path="/dashboard" element={authenticated ? <Dashboard usn={usn} /> : <Navigate to="/login" />} />
                <Route path="/admin" element={authenticated && admin ? <AdminDashboard usn={usn} /> : <Navigate to="/login" />} />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
};

export default App;
