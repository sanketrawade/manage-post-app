const http = require('http');
const { response } = require('express');
const app = require('./backend/app');

const server = http.createServer(app);

const port = process.env.PORT || 3000

server.listen(port,() => {
  console.log('server is running on port.' + port)
 })
