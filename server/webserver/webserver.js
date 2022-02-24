import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import Express from 'express';
import http from 'http';
import morgan from 'morgan';
import Router from '../routes/route.js';

dotenv.config();

let httpServer;

export function initialize() {
  return new Promise((resolve, reject) => {
    const app = Express();
    httpServer = http.createServer(app);
    app.use(morgan('combined'));
    app.use(cors());
    app.use('/DatabaseAPI', Router);
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json({extended: true}));


    httpServer.listen(process.env.port, err => {
      if (err) {
        reject(err);
        return;
      }

      console.log(`Web server listening on localhost:${process.env.port}`);

      resolve();
    });
  });
}

export function close() {
  return new Promise((resolve, reject) => {
    httpServer.close((err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

// const iso8601RegExp = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/;

// function reviveJson(key, value) {
//   // revive ISO 8601 date strings to instances of Date
//   if (typeof value === 'string' && iso8601RegExp.test(value)) {
//     return new Date(value);
//   } else {
//     return value;
//   }
// }
