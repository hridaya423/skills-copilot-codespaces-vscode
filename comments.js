// Create web server
const express = require('express');
const app = express();
// Create a server
const http = require('http');
const server = http.createServer(app);
// Create a socket server
const io = require('socket.io')(server);
// Create a new comments array
let comments = [];
// Create a new socket connection
io.on('connection', (socket) => {
  // Send the comments array to the client
  socket.emit('comments', comments);
  // Listen for new comments from the client
  socket.on('new-comment', (comment) => {
    // Add the comment to the comments array
    comments.push(comment);
    // Broadcast the comments array to all connected clients
    io.emit('comments', comments);
  });
});
// Start the server
server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});