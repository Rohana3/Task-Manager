/*const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mern',
    database: 'time_table'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Connected to the MySQL database');
    }
});

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'daisydasiyda@gmail.com',
        pass: 'xmep lhrg eqii ovwn' // Your app-specific password
    }
});

app.post('/login', (req, res) => {
    const { usn, password } = req.body;
    const query = 'SELECT * FROM info WHERE USN = ? AND PASSWORD = ?';
    db.query(query, [usn, password], (err, results) => {
        if (err) {
            res.status(500).json({ success: false, message: 'Database query error' });
        } else if (results.length > 0) {
            res.json({ success: true, usn });
        } else {
            res.json({ success: false, message: 'Invalid USN or password' });
        }
    });
});

app.get('/tasks/:usn', (req, res) => {
    const { usn } = req.params;
    const query = 'SELECT * FROM tasks WHERE usn = ?';
    db.query(query, [usn], (err, results) => {
        if (err) {
            res.status(500).json({ success: false, message: 'Database query error' });
        } else {
            res.json({ success: true, tasks: results });
        }
    });
});

app.post('/tasks', (req, res) => {
    const { usn, task_name, status } = req.body;
    const query = 'INSERT INTO tasks (usn, task_name, status) VALUES (?, ?, ?)';
    db.query(query, [usn, task_name, status], (err, results) => {
        if (err) {
            res.status(500).json({ success: false, message: 'Database query error' });
        } else {
            // Fetch all "Yet to Be Completed" tasks of the user
            const tasksQuery = 'SELECT task_name, status FROM tasks WHERE usn = ? AND status = "Yet to Be Completed"';
            db.query(tasksQuery, [usn], (tasksErr, tasksResults) => {
                if (tasksErr) {
                    res.status(500).json({ success: false, message: 'Database query error' });
                } else {
                    // Prepare the email content
                    let tasksList = tasksResults.map(task => `${task.task_name} - ${task.status}`).join('\n');

                    // Fetch the user's email address based on the usn
                    const emailQuery = 'SELECT `e-mail` FROM info WHERE USN = ?';
                    db.query(emailQuery, [usn], (emailErr, emailResults) => {
                        if (emailErr) {
                            res.status(500).json({ success: false, message: 'Database query error' });
                        } else {
                            const userEmail = emailResults[0]['e-mail'];
                            
                            console.log('User Email:', userEmail); // Debugging line

                            // Send email notification
                            const mailOptions = {
                                from: 'daisydasiyda@gmail.com',
                                to: userEmail, // Use the user's email address
                                subject: 'Your Pending Tasks',
                                text: `Here are your pending tasks:\n\n${tasksList}`
                            };

                            transporter.sendMail(mailOptions, (error, info) => {
                                if (error) {
                                    console.log('Error sending email:', error); // Debugging line
                                    return console.log(error);
                                }
                                console.log('Email sent: ' + info.response); // Debugging line
                            });

                            res.json({ success: true });
                        }
                    });
                }
            });
        }
    });
});

// Endpoint to update task status
app.put('/tasks/:task_id', (req, res) => {
    const { task_id } = req.params;
    const { status } = req.body;
    const query = 'UPDATE tasks SET status = ? WHERE task_id = ?';
    db.query(query, [status, task_id], (err, results) => {
        if (err) {
            res.status(500).json({ success: false, message: 'Database query error' });
        } else {
            res.json({ success: true });
        }
    });
});

// Add this route for fetching all tasks
// Updated endpoint to fetch all tasks including user names
app.get('/all-tasks', (req, res) => {
    const query = `
        SELECT tasks.task_id, tasks.usn, tasks.task_name, tasks.status, info.name
        FROM tasks
        JOIN info ON tasks.usn = info.USN
    `;
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).json({ success: false, message: 'Database query error' });
        } else {
            res.json({ success: true, tasks: results });
        }
    });
});


// Endpoint to fetch user info
app.get('/user-info/:usn', (req, res) => {
    const { usn } = req.params;
    console.log('Fetching user info for USN:', usn); // Debugging line
    const query = 'SELECT name FROM info WHERE USN = ?';
    db.query(query, [usn], (err, results) => {
        if (err) {
            console.error('Database query error:', err); // Debugging line
            res.status(500).json({ success: false, message: 'Database query error' });
        } else {
            if (results.length > 0) {
                res.json({ success: true, name: results[0].name });
            } else {
                console.log('User not found for USN:', usn); // Debugging line
                res.status(404).json({ success: false, message: 'User not found' });
            }
        }
    });
});

// Endpoint to fetch admin name
app.get('/admin-name', (req, res) => {
    const query = 'SELECT name FROM info WHERE password = "hod"'; // Adjust the query as needed
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).json({ success: false, message: 'Database query error' });
        } else {
            if (results.length > 0) {
                res.json({ success: true, name: results[0].name });
            } else {
                res.status(404).json({ success: false, message: 'Admin not found' });
            }
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});*/
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cron = require('node-cron');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mern',
    database: 'time_table'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Connected to the MySQL database');
    }
});

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'daisydasiyda@gmail.com',
        pass: 'xmep lhrg eqii ovwn' // Your app-specific password
    }
});

app.post('/login', (req, res) => {
    const { usn, password } = req.body;
    const query = 'SELECT * FROM info WHERE USN = ? AND PASSWORD = ?';
    db.query(query, [usn, password], (err, results) => {
        if (err) {
            res.status(500).json({ success: false, message: 'Database query error' });
        } else if (results.length > 0) {
            res.json({ success: true, usn });
        } else {
            res.json({ success: false, message: 'Invalid USN or password' });
        }
    });
});

app.get('/tasks/:usn', (req, res) => {
    const { usn } = req.params;
    const query = 'SELECT * FROM tasks WHERE usn = ?';
    db.query(query, [usn], (err, results) => {
        if (err) {
            res.status(500).json({ success: false, message: 'Database query error' });
        } else {
            res.json({ success: true, tasks: results });
        }
    });
});

app.post('/tasks', (req, res) => {
    const { usn, task_name, status } = req.body;
    const query = 'INSERT INTO tasks (usn, task_name, status) VALUES (?, ?, ?)';
    db.query(query, [usn, task_name, status], (err, results) => {
        if (err) {
            res.status(500).json({ success: false, message: 'Database query error' });
        } else {
            res.json({ success: true });
        }
    });
});

// Endpoint to update task status
app.put('/tasks/:task_id', (req, res) => {
    const { task_id } = req.params;
    const { status } = req.body;
    const query = 'UPDATE tasks SET status = ? WHERE task_id = ?';
    db.query(query, [status, task_id], (err, results) => {
        if (err) {
            res.status(500).json({ success: false, message: 'Database query error' });
        } else {
            res.json({ success: true });
        }
    });
});

// Endpoint to fetch all tasks including user names
app.get('/all-tasks', (req, res) => {
    const query = `
        SELECT tasks.task_id, tasks.usn, tasks.task_name, tasks.status, info.name
        FROM tasks
        JOIN info ON tasks.usn = info.USN
    `;
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).json({ success: false, message: 'Database query error' });
        } else {
            res.json({ success: true, tasks: results });
        }
    });
});

// Endpoint to fetch user info
app.get('/user-info/:usn', (req, res) => {
    const { usn } = req.params;
    console.log('Fetching user info for USN:', usn); // Debugging line
    const query = 'SELECT name FROM info WHERE USN = ?';
    db.query(query, [usn], (err, results) => {
        if (err) {
            console.error('Database query error:', err); // Debugging line
            res.status(500).json({ success: false, message: 'Database query error' });
        } else {
            if (results.length > 0) {
                res.json({ success: true, name: results[0].name });
            } else {
                console.log('User not found for USN:', usn); // Debugging line
                res.status(404).json({ success: false, message: 'User not found' });
            }
        }
    });
});

// Endpoint to fetch admin name
app.get('/admin-name', (req, res) => {
    const query = 'SELECT name FROM info WHERE password = "hod"'; // Adjust the query as needed
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).json({ success: false, message: 'Database query error' });
        } else {
            if (results.length > 0) {
                res.json({ success: true, name: results[0].name });
            } else {
                res.status(404).json({ success: false, message: 'Admin not found' });
            }
        }
    });
});

// Scheduled task to send emails at the end of each month
cron.schedule('0 0 28-31 * *', () => {
    const date = new Date();
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

    if (date.getDate() === lastDay) {
        const tasksQuery = 'SELECT usn, task_name FROM tasks WHERE status = "Yet to Be Completed"';
        db.query(tasksQuery, (tasksErr, tasksResults) => {
            if (tasksErr) {
                console.error('Database query error:', tasksErr);
            } else {
                tasksResults.forEach(task => {
                    const userQuery = 'SELECT `e-mail` FROM info WHERE USN = ? AND password != "hod"';
                    db.query(userQuery, [task.usn], (userErr, userResults) => {
                        if (userErr) {
                            console.error('Database query error:', userErr);
                        } else {
                            if (userResults.length > 0) {
                                const userEmail = userResults[0]['e-mail'];
                                const mailOptions = {
                                    from: 'daisydasiyda@gmail.com',
                                    to: userEmail,
                                    subject: 'Your Pending Tasks',
                                    text: `Here are your pending tasks:\n\n${task.task_name}`
                                };

                                transporter.sendMail(mailOptions, (error, info) => {
                                    if (error) {
                                        console.error('Error sending email:', error);
                                    } else {
                                        console.log('Email sent: ' + info.response);
                                    }
                                });
                            }
                        }
                    });
                });
            }
        });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
