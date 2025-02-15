
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './App.css';

const Dashboard = ({ usn }) => {
    const [tasks, setTasks] = useState([]);
    const [taskName, setTaskName] = useState('');
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch tasks
        const fetchTasks = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/tasks/${usn}`);
                setTasks(response.data.tasks);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        // Fetch user info
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/user-info/${usn}`);
                setUserName(response.data.name);
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };

        fetchTasks();
        fetchUserInfo();
    }, [usn]);

    const handleAddTask = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/tasks', {
                usn,
                task_name: taskName,
                status: 'Yet to Be Completed'
            });
            setTaskName('');
            // Re-fetch tasks to update the list
            const response = await axios.get(`http://localhost:5000/tasks/${usn}`);
            setTasks(response.data.tasks);
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    const handleUpdateStatus = async (task_id, status) => {
        try {
            await axios.put(`http://localhost:5000/tasks/${task_id}`, {
                status
            });
            // Re-fetch tasks to update the list
            const response = await axios.get(`http://localhost:5000/tasks/${usn}`);
            setTasks(response.data.tasks);
        } catch (error) {
            console.error('Error updating task status:', error);
        }
    };

    const handleLogout = () => {
        // Perform any logout logic here (e.g., clearing tokens)
        navigate('/login'); // Redirect to login page
    };

    return (
        <div className="dashboard-container">
            <div className="user-info">
                <p className="user-name">{userName}</p>
                <p className="user-usn">USN: {usn}</p>
                <button onClick={handleLogout} className="logout-button">Log Out</button>
            </div>
            <form onSubmit={handleAddTask} className="add-task-form">
                <h3>Add New Task</h3>
                <input
                    type="text"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    placeholder="New task"
                    required
                    className="task-input"
                />
                <button type="submit" className="add-task-button">Add Task</button>
            </form>
            <div className="tasks-list">
                <h3>Your Tasks</h3>
                <ul>
                    {tasks.map(task => (
                        <li key={task.task_id} className={task.status === 'Yet to Be Completed' ? 'pending-task' : 'completed-task'}>
                            {task.task_name}
                            {task.status === 'Yet to Be Completed' ? (
                                <button onClick={() => handleUpdateStatus(task.task_id, 'Completed')} className="pending-button">
                                    Yet to Be Completed
                                </button>
                            ) : (
                                <span className="status">Completed</span>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;

