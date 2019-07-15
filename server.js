const express = require('express');
import routes from './accounts'

const server = express();
server.use(express.json());

server.use('/api', routes);

server.get('/', (req, res) => {
    res.json(`<h2>Welcome to Accounts</h2>`)
  });
  
  server.all('*', (req, res) => {
    res.json(`
      Sorry, no such route, try again!
    `);
  });


export default server;