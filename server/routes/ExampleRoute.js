import { Router } from 'express';

export const createExampleRoute = ({ model }) => {
  const router = Router();

  router.get('/', (req, res, next) => {
    console.log('hello!');

    res.locals.result = {
      foo: 'bar',
      buz: 'qux',
    };

    next();
  });

  router.get('/error', (req, res, next) => {
    next(new Error('FUCK UP!'));
  });

  return router;
};
