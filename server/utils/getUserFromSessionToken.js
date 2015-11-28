import jwt from 'jsonwebtoken';
import { SESSION_TOKEN_PRIVATE_KEY } from '../constants';

export const getUserFromSessionToken = sessionToken => {
  return new Promise((resolve, reject) => {
    jwt.verify(sessionToken, SESSION_TOKEN_PRIVATE_KEY, {
      algorithm: 'HS512',
    }, (err, payload) => {
      if (err) return reject(err);

      resolve(payload);
    });
  });
};
