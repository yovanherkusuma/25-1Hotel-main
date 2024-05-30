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

// get all galleries
const getData = async (req, res) => {
    try {
      const [results] = await pool.query('SELECT * FROM tbl_galleries');
      res.json(results);
    } catch (error) {
      console.error('Database query error:', error);
      res.status(500).json({ error: error.message });
    }
  };

//get galleries by id
const getDataId = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query('SELECT * FROM tbl_galleries WHERE galleries_id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Room not found' });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Database query error:', error);
    res.status(500).json({ error: error.message });
  }
};

// create galleries
const createGalleries = async (req, res) => {
  const { galleries_id, room_id, gal_image } = req.body;
  const createdAt = new Date();
  const updatedAt = new Date();

  try {
    // Check if the room_id exists in tbl_rooms
    const [roomRows] = await pool.query('SELECT * FROM tbl_rooms WHERE room_id = ?', [room_id]);
    if (roomRows.length === 0) {
      return res.status(400).json({ error: 'Invalid galleries_id. Room does not exist.' });
    }

    // Proceed to insert into tbl_galleries
    const query = 'INSERT INTO tbl_galleries (galleries_id, room_id, gal_image, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)';
    const values = [galleries_id, room_id, gal_image, createdAt, updatedAt];

    const [results] = await pool.query(query, values);
    res.status(201).json({ message: 'Gallery created successfully' });
  } catch (error) {
    console.error('Database insert error:', error);
    res.status(500).json({ error: error.message });
  }
};

// update galleries
const updateGalleries = async (req, res) => {
  const { id } = req.params;
  const { gal_image, room_id } = req.body;
  const updatedAt = new Date();

  try {
    const [result] = await pool.query(
      'UPDATE tbl_galleries SET gal_image = ?, room_id = ?, updatedAt = ? WHERE galleries_id = ?',
      [gal_image, room_id, updatedAt, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Galleries not found' });
    }

    res.status(200).json({ message: 'Galleries updated successfully' });
  } catch (error) {
    console.error('Database update error:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getData,
  getDataId,
  createGalleries,
  updateGalleries
};