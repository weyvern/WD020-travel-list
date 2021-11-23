import 'dotenv/config.js';
import express from 'express';
import cors from 'cors';
import countriesRouter from './routes/countriesRouter.js';
import usersRouter from './routes/usersRouter.js';

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use('/api/countries', countriesRouter);
app.use('/api/users', usersRouter);

app.listen(port, () => console.log(`Server is running at http://localhost:${port}`));
