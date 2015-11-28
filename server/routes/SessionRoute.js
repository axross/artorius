import { Router } from 'express';
import jwt from 'jsonwebtoken';
import {
  generateSessionTokenByUser,
  generateHashedPassword,
} from '../utils';
import {
  validatePassword,
  validateUser,
} from '../../validators';

export const createSessionRoute = ({ model }) => {
  const router = Router();

  router.put('/refresh', (req, res, next) => {
    if (!req.user) next(new Error('UNKO!'));

    const user = req.user;

    generateSessionTokenByUser(user)
      .then(sessionToken => {
        res.locals.ok = true;
        res.locals.result = { user, sessionToken };

        next();
      })
      .catch(err => {
        console.error(err.errors);
        console.error(err.stack);

        next(err);
      });
  });

  router.post('/signin', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    validatePassword(password)
      .then(generateHashedPassword)
      .then(hashedPassword => {
        return model.User.findOne({
          where: { email, hashedPassword },
        });
      })
      .then(found => {
        if (!found) throw new Error('USER_NOT_FOUND');

        return validateUser(found.dataValues);
      })
      .then(user => {
        generateSessionTokenByUser(user)
          .then(sessionToken => {
            res.locals.ok = true;
            res.locals.result = { user, sessionToken };

            next();
          });
      })
      .catch(err => {
        console.error(err.errors);
        console.error(err.stack);

        next(err);
      });
  });

  return router;
};
