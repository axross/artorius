import bodyParser from 'body-parser';
import express from 'express';
import morgan from 'morgan';
import path from 'path';
import serveStatic from 'serve-static';
import { getUserFromSessionToken } from './utils';

export const createServer = ({ model, routes, config }) => {
  const server = express();

  server.use(morgan('dev'));
  server.use(serveStatic(path.resolve(__dirname, './public')));
  server.use(bodyParser.json());

  server.use((req, res, next) => {
    const sessionToken = req.headers['x-session-token'];

    if (!sessionToken) return next();

    getUserFromSessionToken(sessionToken)
      .then(user => {
        req.user = user;

        next();
      })
      .catch(err => {
        err.status = 401;

        next(err);
      });
  });

  // register route handlers
  for (const key of Object.keys(routes)) {
    server.use(`/api${key}`, routes[key]);
  }

  // respond to request (in success case)
  server.use((req, res, next) => {
    if (!res.locals.ok) return next();

    res
      .status(200)
      .json({
        error: null,
        result: res.locals.result || {},
      });
  });

  // respond to request (in failure case)
  server.use((err, req, res, next) => {
    res
      .status(err.status || 500)
      .json({
        error: err.message,
        result: {},
      });
  });

  return server;
};
