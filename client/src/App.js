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
  render() {
    return (
      <div className="App">
    
        <header>
          <h1>ToDoList.app</h1>
        </header>
    
        <section className="tasks-section" id="tasks-section">
          <h2>Tasks</h2>
    
          <ul className="tasks-section__list" id="tasks-list">
            {tasks === undefined || tasks.length < 1
              ? ''
              : tasks.map((task) => (
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
    
          <form id="add-task-form">
            <input className="text-input" autocomplete="off" type="text" placeholder="Type your description" id="task-name" />
            <button className="btn" type="submit">Add aaa</button>
          </form>
    
        </section>
      </div>
    );
  };

};

export default App;