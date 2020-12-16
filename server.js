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
      const newTask = {
        id: tasks.length + 1,
        name: task 
      }
      tasks.push({
        id: tasks.length + 1,
        name:task
      });
      tasks.push(newTask);
      io.emit('addTaskFromServer', newTask);
    });
    socket.on('removeTask', (taskId) => {
      const taskIndex = tasks.findIndex(task => task.id === taskId);
        tasks.splice(taskIndex, 1);
        io.emit('removeTaskFromServer', taskId);
  });
});

app.use((req, res) => {
  res.status(404).send({ message: 'Not found...' });
});