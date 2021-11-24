import 'dotenv/config.js';
import express from 'express';
import cors from 'cors';
import countriesRouter from './routes/countriesRouter.js';
import usersRouter from './routes/usersRouter.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.get('/sync', (req, res) => {
  throw new Error('BROKEN'); // Express will catch this on its own.
});

app.get('/async', (req, res, next) => {
  fs.readFile('/file-does-not-exist', (err, data) => {
    if (err) {
      next(err); // Pass errors to Express.
    } else {
      res.send(data);
    }
  });
});

app.use('/api/countries', countriesRouter);
app.use('/api/users', usersRouter);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running at http://localhost:${port}`));
