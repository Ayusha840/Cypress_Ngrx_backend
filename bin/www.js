const http = require('http');
const app = require('./../app');
const model = require('./../db-connection/db-connection');
const port = normalizePort(process.env.Port || 3000);
const server = http.createServer(app);


model.connectToDatabase().then((res) => {
    console.log('db connected!!!');
    server.listen(port, () => {
        console.log('server runing on 3000');
    })
    
})


function normalizePort(val) {
  const port = parseInt(val)
  if (isNaN(port)) {
    return val;
  }
  if (port > 0) {
    return port;
  }
  return false;
}
