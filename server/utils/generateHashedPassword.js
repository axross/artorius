import crypto from 'crypto';
import { PASSWORD_SOLT } from '../constants';

export const generateHashedPassword = password => {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash('sha512');

    hash.update(`${password}${PASSWORD_SOLT}`, 'utf8');
    const hashedPassword = hash.digest('hex');

    resolve(hashedPassword);
  });
};
