const productRoutes = require('./routes/product')
const userRoutes = require('./routes/user')
const sucursalRoutes = require('./routes/sucursal')
const ticketRoutes = require('./routes/ticket')
const analyticRoutes = require('./routes/analytic')
const mercadoPagoRoute = require('./routes/mercadopago')
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const cors = require('cors')

require('./db.js');

const server = express();
const http = require('http').createServer(server)


server.name = 'API';

server.use(cors())
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use('/', productRoutes);
server.use('/', userRoutes);
server.use('/', sucursalRoutes);
server.use('/', ticketRoutes);
server.use('/', analyticRoutes);
server.use('/', mercadoPagoRoute);

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = http;
