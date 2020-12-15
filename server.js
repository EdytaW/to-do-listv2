const express = require('express');
const path = require('path');
const socket = require('socket.io');

const tasks = [];

const app = express();

app.use(express.static(path.join(__dirname, '/client/build')));
app.get('*', (req, res) => {
    res.render(path.join(__dirname, '/client/build/index.html'));
});

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running...');
});

const io = socket(server); 

io.on('connection', (socket) => {
    socket.emit('updateTask', tasks);
    socket.on('addTask', (task) => {
      tasks.push(task);
      console.log('task',tasks )
      socket.broadcast.emit('updateTask', tasks);
    });
    socket.on('removeTask', (taskIndex) => {
        tasks.splice(taskIndex, 1);
        socket.broadcast.emit('updateTask', tasks);
        console.log('task',tasks )
  });
});

app.use((req, res) => {
  res.status(404).send({ message: 'Not found...' });
});