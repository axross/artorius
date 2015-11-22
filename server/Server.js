import bodyParser from 'body-parser';
import express from 'express';
import morgan from 'morgan';
import path from 'path';
import serveStatic from 'serve-static';

export const createServer = () => {
  const server = express();

  server.use(morgan('dev'));
  server.use(serveStatic(path.resolve(__dirname, './public')));
  server.use(bodyParser.json());

  return server;
};
