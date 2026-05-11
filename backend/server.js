const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const { executeJava } = require('./executeService');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('execute', async (data) => {
    const { code, input } = data;
    
    if (!code) {
      socket.emit('output', { type: 'error', data: 'No code provided.' });
      return;
    }

    try {
      await executeJava(code, input, socket);
    } catch (err) {
      console.error('Execution error:', err);
      socket.emit('output', { type: 'error', data: 'Internal Server Error' });
    }
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
