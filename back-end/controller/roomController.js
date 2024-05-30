// controllers/dataController.js
// const mysql = require('mysql2');
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Create a MySQL connection pool using environment variables
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});
// console.log(process.env);

// get all rooms
const getData = (req, res) => {
  pool.query('SELECT * FROM tbl_rooms', (error, results) => {
    if (error) {
        console.error('Database query error:', error); // Log the error
        return res.status(500).json({ error: error.message });
    }
    // console.log('Query results:', results); // Log the results
    res.json(results);
  });
};

//get room by id
const getDataId = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query('SELECT * FROM tbl_rooms WHERE room_id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Room not found' });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Database query error:', error);
    res.status(500).json({ error: error.message });
  }
};

// create room
const createRoom = async (req, res) => {
  const { room_id, cat_id, name, description, price, status, archived } = req.body;
  const createdAt = new Date();
  const updatedAt = new Date();

  const query = 'INSERT INTO tbl_rooms (room_id, cat_id, name, description, price, status, archived, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const values = [room_id, cat_id, name, description, price, status, archived, createdAt, updatedAt];

  try {
    const [results] = await pool.query(query, values);
    res.status(201).json({ message: 'Room created successfully'});
  } catch (error) {
    console.error('Database insert error:', error);
    res.status(500).json({ error: error.message });
  }
};

// update room
const updateRoom = async (req, res) => {
  const { id } = req.params;
  const { status, archived } = req.body;
  const updatedAt = new Date();

  try {
    const [result] = await pool.query(
      'UPDATE tbl_rooms SET archived = 1, updatedAt = ? WHERE room_id = ?',
      [updatedAt, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Room not found' });
    }

    res.status(200).json({ message: 'Room updated successfully' });
  } catch (error) {
    console.error('Database update error:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getData,
  getDataId,
  createRoom,
  updateRoom
};