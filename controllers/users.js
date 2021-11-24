import db from '../db/pg.js';
import ErrorResponse from '../utils/ErrorResponse.js';

export const getAllUsers = async (req, res, next) => {
  try {
    const { rowCount, rows } = await db.query('SELECT * FROM users ORDER BY id ASC;');
    res.json({ total: rowCount, users: rows });
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const {
      body: { first_name, last_name, age }
    } = req;
    if (!first_name || !last_name || !age) throw new ErrorResponse('All fields are required', 400);
    const {
      rows: [user]
    } = await db.query(
      `INSERT INTO users(first_name, last_name, age) VALUES($1, $2, $3) RETURNING *;`,
      [first_name, last_name, age]
    );
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const getSingleUser = async (req, res, next) => {
  try {
    const {
      params: { id }
    } = req;
    const {
      rowCount,
      rows: [user]
    } = await db.query(`SELECT * FROM users WHERE id=$1;`, [id]);
    if (!rowCount) throw new ErrorResponse(`User with id of ${id} doesn't exist`, 404);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const {
      params: { id },
      body: { first_name, last_name, age }
    } = req;
    if (!first_name || !last_name || !age) throw new ErrorResponse('All fields are required', 400);
    const { rowCount } = await db.query(`SELECT * FROM users WHERE id=$1;`, [id]);
    if (!rowCount) throw new ErrorResponse(`User with id of ${id} doesn't exist`, 404);
    const {
      rows: [user]
    } = await db.query(
      `UPDATE users SET first_name=$1, last_name=$2, age=$3 WHERE id=$4 RETURNING *;`,
      [first_name, last_name, age, id]
    );
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const {
      params: { id }
    } = req;
    const { rowCount } = await db.query(`SELECT * FROM users WHERE id=$1;`, [id]);
    if (!rowCount) throw new ErrorResponse(`User with id of ${id} doesn't exist`, 404);
    const { rowCount: deleteConfirm } = await db.query(`DELETE FROM users WHERE id=$1;`, [id]);
    if (deleteConfirm) return res.json({ message: 'Success' });
  } catch (error) {
    next(error);
  }
};
