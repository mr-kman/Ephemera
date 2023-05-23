require('dotenv').config();
const express = require('express');
const app = express();
const admin = require('firebase-admin');
const cors = require('cors');
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, {
  cors: {
    origin: process.env.CORS,
  },
});

let port = process.env.PORT;

if (port == null || port == '') {
  port = 8000;
}

const accountController = require('./account/account.controller');
const messageController = require('./message/message.controller');

app.use(express.json());
app.use(cors());

// Uncomment to debug server call routes
// const logRoute = (req, res, next) => {
//   console.log(`Route called: ${req.method} ${req.originalUrl}`);
//   next();
// };
// app.use(logRoute);

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};

app.get('/', (req, res) => {
  res.status(404).send('');
});

// Initialize the default app
admin.initializeApp(firebaseConfig);

app.post('/createUser', accountController.save);
app.post('/signInUser', accountController.getUser);
app.get('/validation', accountController.getUser);
app.patch('/updateUserPreferences', accountController.updatePreferences);

app.post('/postMessage', messageController.save, (req, res) => {
  io.emit('posted message', req.postedMessage);
  res.end();
});

app.patch('/upvote', messageController.upvote);
app.get('/rage/unfiltered', messageController.getUnfiltered);
app.get('/rage/filtered', messageController.getFiltered);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
