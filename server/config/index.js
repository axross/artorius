import path from 'path';

export const loadConfig = environment => {
  const filename = path.resolve(__dirname, `${environment}.js`);
  let config;

  try {
    config = require(filename);
  } catch (err) {
    throw new ReferenceError(`config file "${environment}.js" is not exists!`);
  }

  return config;
};
