import db from '../db/pg.js';

export const getAllUsers = async (req, res) => {
  try {
    const { rowCount, rows } = await db.query('SELECT * FROM users ORDER BY id ASC;');
    res.json({ total: rowCount, users: rows });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createUser = async (req, res) => {
  try {
    const {
      body: { first_name, last_name, age }
    } = req;
    if (!first_name || !last_name || !age) throw new Error('All fields are required');
    const {
      rows: [user]
    } = await db.query(`INSERT INTO users(first_name, last_name, age) VALUES($1, $2, $3) RETURNING *;`, [
      first_name,
      last_name,
      age
    ]);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSingleUser = async (req, res) => {
  try {
    const {
      params: { id }
    } = req;
    const {
      rowCount,
      rows: [user]
    } = await db.query(`SELECT * FROM users WHERE id=$1;`, [id]);
    if (!rowCount) return res.status(404).json({ message: `User with id of ${id} doesn't exist` });
    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateUser = async (req, res) => {
  try {
    const {
      params: { id },
      body: { first_name, last_name, age }
    } = req;
    if (!first_name || !last_name || !age) throw new Error('All fields are required');
    const { rowCount } = await db.query(`SELECT * FROM users WHERE id=$1;`, [id]);
    if (!rowCount) throw new Error(`User with id of ${id} doesn't exist`);
    const {
      rows: [user]
    } = await db.query(`UPDATE users SET first_name=$1, last_name=$2, age=$3 WHERE id=$4 RETURNING *;`, [
      first_name,
      last_name,
      age,
      id
    ]);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const {
      params: { id }
    } = req;
    const { rowCount } = await db.query(`SELECT * FROM users WHERE id=$1;`, [id]);
    if (!rowCount) return res.status(404).json({ message: `User with id of ${id} doesn't exist` });
    const { rowCount: deleteConfirm } = await db.query(`DELETE FROM users WHERE id=$1;`, [id]);
    if (deleteConfirm) return res.json({ message: 'Success' });
  } catch (error) {
    if (error.code === '23503') return res.status(500).json({ error: 'Cannot delete because of constraint' });
    res.status(500).json(error);
  }
};
