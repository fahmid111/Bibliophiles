import { start, stop } from './Database/database.js';
import { config } from './Database/databaseConfiguration.js';
import { close, initialize } from './webserver/webserver.js';

const defaultThreadPoolSize = 4;
process.env.UV_THREADPOOL_SIZE = config.poolMax + defaultThreadPoolSize;


async function startup() {
  try {
    console.log('Initializing database module');

    await start(); 
  } catch (err) {
    console.error(err);

    process.exit(1);
  }

  console.log('Starting application');

  try {
    console.log('Initializing web server module');

    await initialize();
  } catch (err) {
    console.error(err);

    process.exit(1);
  }
}

async function shutdown(e) {
  let err = e;

  console.log('Shutting down');

  try {
    console.log('Closing web server module');

    await close();
  } catch (e) {
    console.log('Encountered error', e);

    err = err || e;
  }

  try {
    console.log('Closing database module');

    await stop(); 
  } catch (err) {
    console.log('Encountered error', e);

    err = err || e;
  }

  console.log('Exiting process');

  if (err) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

startup();

process.on('SIGTERM', () => {
  console.log('Received SIGTERM');

  shutdown();
});

process.on('SIGINT', () => {
  console.log('Received SIGINT');

  shutdown();
});

process.on('uncaughtException', err => {
  console.log('Uncaught exception');
  console.error(err);

  shutdown(err);
});