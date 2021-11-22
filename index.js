import express from 'express';
import countriesRouter from './routes/countriesRouter.js';

const app = express();
const port = 5000;

app.use(express.json());
app.use('/api/countries', countriesRouter);

app.listen(port, () => console.log(`Server is running at http://localhost:${port}`));
