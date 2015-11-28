import moment from 'moment';
import { loadConfig } from './config';
import { createModel } from './Model';
import { createServer } from './Server';
import {
  createExampleRoute,
  createUserRoute,
  createSessionRoute,
} from './routes';

const envirionment = process.env.NODE_ENV || 'local';
const output = envirionment === 'local' ? process.stdout : process.stdout;

console.log(`Application started at ${moment().format()} on ${envirionment}`);

const config = loadConfig(envirionment);
const { model } = createModel({ config });
const routes = {
  '/example': createExampleRoute({ config }),
  '/user': createUserRoute({ model }),
  '/session': createSessionRoute({ model }),
};

const server = createServer({ model, routes, config });

Promise.all([
  model.Session.sync(),
  model.User.sync(),
])
  .then(() => {
    server.listen(3000);
  })
  .catch(err => output(err, '\n', err.stack));
