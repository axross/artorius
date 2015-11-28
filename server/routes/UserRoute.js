import { Router } from 'express';
import Sequelize from 'sequelize';
import {
  generateHashedPassword,
  parsePaginateData,
} from '../utils';
import {
  validatePassword,
  validateUser,
} from '../../validators';

export const createUserRoute = ({ model }) => {
  const router = Router();

  router.get('/', (req, res, next) => {
    parsePaginateData(req.query)
      .then(({ limit, offset }) => model.User.findAll({ limit, offset }))
      .then(founds => {
        const users = founds.map(found => found.dataValues)

        res.locals.result = { users };
        res.locals.ok = true;

        next();
      })
      .catch(err => {
        console.error(err.errors);
        console.error(err.stack);

        next(err);
      });
  });

  router.post('/', (req, res, next) => {
    const password = req.body.password;

    validatePassword(password)
      .then(generateHashedPassword)
      .then(hashedPassword => {
        return validateUser(req.body.user)
          .then(user => {
            const row = Object.assign({}, user, { hashedPassword });

            delete row.id;

            return model.User.create(row);
          });
      })
      .then(change => validateUser(change.dataValues))
      .then(user => {
        res.locals.ok = true;
        res.locals.result = { user };

        next();
      })
      .catch(err => {
        console.error(err.errors);
        console.error(err.stack);

        next(err);
      });
  });

  return router;
};
