const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Zongufone12!', // your password
  database: 'security_db'
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL DB");
});

// Add employee
app.post('/api/employees', (req, res) => {
  const { name, phone, assignedSite } = req.body;
  const sql = 'INSERT INTO employees (name, phone, assigned_site) VALUES (?, ?, ?)';
  db.query(sql, [name, phone, assignedSite], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: 'Employee added successfully', id: result.insertId });
  });
});

// Get all employees
app.get('/api/employees', (req, res) => {
  db.query('SELECT * FROM employees', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json(results);
  });
});

app.listen(8080, () => {
  console.log("Server running on http://localhost:8080");
});
