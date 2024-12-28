/*import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setAuthenticated, setUsn, setAdmin }) => {
    const [usn, setUsnInput] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/login', { usn, password });
            if (response.data.success) {
                setAuthenticated(true);
                setUsn(usn);
                if (password === 'hod') {
                    setAdmin(true);
                    navigate('/admin');
                } else {
                    navigate('/dashboard');
                }
            } else {
                setError('Invalid USN or password');
            }
        } catch (error) {
            setError('An error occurred');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>USN:</label>
                    <input type="text" value={usn} onChange={(e) => setUsnInput(e.target.value)} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;*/
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './App.css';

const Login = ({ setAuthenticated, setUsn, setAdmin }) => {
    const [usn, setUsnInput] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/login', { usn, password });
            if (response.data.success) {
                setAuthenticated(true);
                setUsn(usn);
                if (password === 'hod') {
                    setAdmin(true);
                    navigate('/admin');
                } else {
                    navigate('/dashboard');
                }
            } else {
                setError('Invalid USN or password');
            }
        } catch (error) {
            setError('An error occurred');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>USN:</label>
                    <input type="text" value={usn} onChange={(e) => setUsnInput(e.target.value)} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
