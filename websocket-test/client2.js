const io = require('socket.io-client');

const clientId = '1'; // Unique ID for the client
const socket = io('http://localhost:3001', {
  query: { clientId }
});

socket.on('message', (message) => {
  console.log('Received message:', message);
});

socket.emit('message', { to: '2', message: 'Sending this one' });