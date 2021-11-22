import { Router } from 'express';
import {
  getAllCountries,
  createNewCountry,
  getSingleCountry,
  updateCountry,
  deleteCountry
} from '../controllers/countries.js';

const countriesRouter = Router();

countriesRouter.route('/').get(getAllCountries).post(createNewCountry);

countriesRouter.route('/:code').get(getSingleCountry).put(updateCountry).delete(deleteCountry);

export default countriesRouter;
