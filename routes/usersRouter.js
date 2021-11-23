import { Router } from 'express';
import { createUser, deleteUser, getAllUsers, getSingleUser, updateUser } from '../controllers/users.js';

const usersRouter = Router();

usersRouter.route('/').get(getAllUsers).post(createUser);

usersRouter.route('/:code').get(getSingleUser).put(updateUser).delete(deleteUser);

export default usersRouter;
