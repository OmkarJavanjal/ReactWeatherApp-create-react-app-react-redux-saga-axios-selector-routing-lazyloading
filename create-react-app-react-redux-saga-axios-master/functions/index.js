// const functions = require('firebase-functions');
const jsonServer = require('json-server');
const server = jsonServer.create();
//const router = jsonServer.router('db.json');
const router = jsonServer.router('db1.json');
const middleware = jsonServer.defaults();
const cors = require('cors')({origin: true});

server.use(middleware);

server.use(cors);

server.use(router);

server.listen(3004, () => {
    console.log('JSON Server is running')
});

// exports.main = functions.https.onRequest(server);
