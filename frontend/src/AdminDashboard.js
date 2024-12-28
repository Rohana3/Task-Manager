/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './App.css';

const AdminDashboard = () => {
    const [tasks, setTasks] = useState({ pending: [], completed: [] });
    const [adminName, setAdminName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get('http://localhost:5000/all-tasks');
                const pendingTasks = response.data.tasks.filter(task => task.status === 'Yet to Be Completed');
                const completedTasks = response.data.tasks.filter(task => task.status === 'Completed');
                setTasks({ pending: pendingTasks, completed: completedTasks });
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        const fetchAdminName = async () => {
            try {
                const response = await axios.get('http://localhost:5000/admin-name');
                setAdminName(response.data.name);
            } catch (error) {
                console.error('Error fetching admin name:', error);
            }
        };

        fetchTasks();
        fetchAdminName();
    }, []);

    const handleLogout = () => {
        // Perform any logout logic here (e.g., clearing tokens)
        navigate('/login'); // Redirect to login page
    };

    return (
        <div className="dashboard-container">
            <div className="user-info">
                <p className="user-name">{adminName}</p>
                <button onClick={handleLogout} className="logout-button">Log Out</button>
            </div>
            <div>
                <h3>Yet to Be Completed</h3>
                <ul>
                    {tasks.pending && tasks.pending.length > 0 ? (
                        tasks.pending.map(task => (
                            <li key={task.task_id}>{task.usn} - {task.task_name}</li>
                        ))
                    ) : (
                        <p>No pending tasks</p>
                    )}
                </ul>
            </div>
            <div>
                <h3>Completed</h3>
                <ul>
                    {tasks.completed && tasks.completed.length > 0 ? (
                        tasks.completed.map(task => (
                            <li key={task.task_id}>{task.usn} - {task.task_name}</li>
                        ))
                    ) : (
                        <p>No completed tasks</p>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default AdminDashboard;*/
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './App.css';

const AdminDashboard = () => {
    const [tasks, setTasks] = useState({ pending: [], completed: [] });
    const [adminName, setAdminName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get('http://localhost:5000/all-tasks');
                const pendingTasks = response.data.tasks.filter(task => task.status === 'Yet to Be Completed');
                const completedTasks = response.data.tasks.filter(task => task.status === 'Completed');
                setTasks({ pending: pendingTasks, completed: completedTasks });
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        const fetchAdminName = async () => {
            try {
                const response = await axios.get('http://localhost:5000/admin-name');
                setAdminName(response.data.name);
            } catch (error) {
                console.error('Error fetching admin name:', error);
            }
        };

        fetchTasks();
        fetchAdminName();
    }, []);

    const handleLogout = () => {
        navigate('/login'); // Redirect to login page
    };

    return (
        <div className="dashboard-container">
            <div className="user-info">
                <p className="user-name">{adminName}</p>
                <p className="user-usn">HOD</p>
                <button onClick={handleLogout} className="logout-button">Log Out</button>
            </div>
            <div>
                <h3>Yet to Be Completed</h3>
                <ul>
                    {tasks.pending && tasks.pending.length > 0 ? (
                        tasks.pending.map(task => (
                            <li key={task.task_id}>{task.name} ({task.usn}) - {task.task_name}</li>
                        ))
                    ) : (
                        <p>No pending tasks</p>
                    )}
                </ul>
            </div>
            <div>
                <h3>Completed</h3>
                <ul>
                    {tasks.completed && tasks.completed.length > 0 ? (
                        tasks.completed.map(task => (
                            <li key={task.task_id}>{task.name} ({task.usn}) - {task.task_name}</li>
                        ))
                    ) : (
                        <p>No completed tasks</p>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default AdminDashboard;
