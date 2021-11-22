const countries = [
  {
    id: 1,
    name: 'Mexico',
    alpha2Code: 'MX',
    alpha3Code: 'MEX'
  },
  {
    id: 2,
    name: 'Deutschland',
    alpha2Code: 'DE',
    alpha3Code: 'DEU'
  }
];

const findCountry = code => {
  if (!code) return null;
  const countryCode = code.toUpperCase();
  return countries.find(c => c.alpha2Code === countryCode || c.alpha3Code === countryCode);
};

export const getAllCountries = (req, res) => {
  res.json(countries);
};

export const createNewCountry = (req, res) => {
  const {
    body: { name, alpha2Code, alpha3Code }
  } = req;
  const country = findCountry(alpha2Code) || findCountry(alpha3Code);
  if (country) return res.status(403).json({ msg: 'Country already exists' });
  const newCountry = { id: countries.length + 1, name, alpha2Code, alpha3Code };
  countries.push(newCountry);
  res.json(newCountry);
};

export const getSingleCountry = (req, res) => {
  const {
    params: { code }
  } = req;
  const country = findCountry(code);
  country ? res.json(country) : res.status(404).json({ msg: `Country with code of ${code} does not exist` });
};

export const updateCountry = (req, res) => {
  const {
    params: { code },
    body: { name, alpha2Code, alpha3Code }
  } = req;
  const country = findCountry(code);
  if (!country) return res.status(404).json({ msg: `Cannot update but country with code of ${code} does not exist` });
  country.name = name;
  country.alpha2Code = alpha2Code;
  country.alpha3Code = alpha3Code;
  res.json(country);
};

export const deleteCountry = (req, res) => {
  const {
    params: { code }
  } = req;
  const country = findCountry(code);
  if (!country) return res.status(404).json({ msg: `Cannot delete but country with code of ${code} does not exist` });
  const index = countries.indexOf(country);
  countries.splice(index, 1);
  res.json({ msg: 'Country deleted' });
};
