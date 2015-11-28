import jwt from 'jsonwebtoken';
import moment from 'moment';
import { SESSION_TOKEN_PRIVATE_KEY } from '../constants';

export const generateSessionTokenByUser = user => {
  return new Promise((resolve, reject) => {
    jwt.sign({
      user,
      createdAt: moment().format(),
    }, SESSION_TOKEN_PRIVATE_KEY, {
      algorithm: 'HS512',
      expiresIn: '14d',
    }, token => {
      resolve(token);
    });
  });
};
