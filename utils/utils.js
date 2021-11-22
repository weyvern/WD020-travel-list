export const findCountry = (code1, code2) =>
  countries.find(
    country =>
      country.alpha2Code.toLowerCase() === code1.toLowerCase() ||
      country.alpha3Code.toLowerCase() === code2.toLowerCase()
  );
