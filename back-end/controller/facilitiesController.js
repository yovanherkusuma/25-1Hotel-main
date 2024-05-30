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

// get all facilities
const getData = async (req, res) => {
    try {
      const [results] = await pool.query('SELECT * FROM tbl_facilities');
      res.json(results);
    } catch (error) {
      console.error('Database query error:', error);
      res.status(500).json({ error: error.message });
    }
  };

//get facilities by id
const getDataId = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query('SELECT * FROM tbl_facilities WHERE facilities_id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Facilities not found' });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Database query error:', error);
    res.status(500).json({ error: error.message });
  }
};

// create facilities
const createFacilities = async (req, res) => {
  const { facilities_id, cat_id, facilities } = req.body;
  const createdAt = new Date();
  const updatedAt = new Date();

  try {
    // Check if the facilities_id exists in tbl_facilities
    // const [roomRows] = await pool.query('SELECT * FROM tbl_facilities WHERE facilities_id = ?', [room_id]);
    // if (roomRows.length === 0) {
    //   return res.status(400).json({ error: 'Invalid facilities_id. Facilities does not exist.' });
    // }

    // Proceed to insert into tbl_galleries
    const query = 'INSERT INTO tbl_facilities (facilities_id, cat_id, facilities, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)';
    const values = [facilities_id, cat_id, facilities, createdAt, updatedAt];

    const [results] = await pool.query(query, values);
    res.status(201).json({ message: 'Facilities created successfully' });
  } catch (error) {
    console.error('Database insert error:', error);
    res.status(500).json({ error: error.message });
  }
};

// update facilities
const updateFacilities = async (req, res) => {
  const { id } = req.params;
  const { facilities } = req.body;
  const updatedAt = new Date();

  try {
    const [result] = await pool.query(
      'UPDATE tbl_facilities SET facilities = ?, updatedAt = ? WHERE facilities_id = ?',
      [facilities, updatedAt, id]
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
  createFacilities,
  updateFacilities
};