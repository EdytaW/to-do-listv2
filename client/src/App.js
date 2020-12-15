import React from 'react';
import io from 'socket.io-client';

class App extends React.Component {
 state = {
    tasks: [],	    
    taskName: '',	    
  };

  componentDidMount() {
    this.socket = io.connect('http://localhost:8000');	    
    this.socket.on('removeTask', (taskId) => this.removeTask(taskId));	   
    this.socket.on('updateTask', (tasks) => this.updateTask(tasks));	   
  }

  updateTaskName(event) {
    this.setState({
      ...this.state,
      taskName: event.target.value
    });
  }

  onSubmit(event) {
    event.preventDefault();
    this.socket.emit('addTask', this.state.taskName);
  };
  
  render() {
    return (
      <div className="App">
    
        <header>
          <h1>ToDoList.app</h1>
        </header>
    
        <section className="tasks-section" id="tasks-section">
          <h2>Tasks</h2>
    
          <ul className="tasks-section__list" id="tasks-list">
            {this.state.tasks === undefined || this.state.tasks.length < 1
              ? ''
              : this.state.tasks.map((task) => (
                  <li key={task.id} className='task'>
                    {task.name}	               
                    <button	                   
                      className='btn btn--red'	                      
                      onClick={() => this.handleRemoveTask(task.id)}	                      
                    >	                    
                      Remove	                   
                    </button>	                    
                  </li>	                
                ))}	                
          </ul>
    
          <form id="add-task-form" onSubmit={(event) => this.onSubmit(event)}>
            <input className="text-input" autocomplete="off" onChange={(event) => this.updateTaskName(event)} value={this.state.taskName} type="text" placeholder="Type your description" id="task-name" />
            <button className="btn" type="submit">Add</button>
          </form>
    
        </section>
      </div>
    );
  };

};

export default App;