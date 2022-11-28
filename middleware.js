import dotenv from 'dotenv';
import { getCurrentLoggingDate } from './util.js';

dotenv.config();

export function loggingMiddleware(req, res, next) {
  const formattedDate = getCurrentLoggingDate();
  console.log(`${formattedDate}: ${req.method} ${req.url} ${res.statusCode}`);
  next();
}

export function configurationMiddleware(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
}

export function validateMiddlware(req, res, next) {
  if (
    process.env.IP_ADDRESS ===
    req.connection.remoteAddress.replace('::ffff:', '')
  ) {
    next();
  } else {
    console.log(`Bad IP: ${req.connection.remoteAddress}`);
    res.status(500).send('Internal Server Error');
  }
}
