const http = require('http');
const handleRoutes = require('./route');

const server = http.createServer(handleRoutes);

server.listen(3000);
