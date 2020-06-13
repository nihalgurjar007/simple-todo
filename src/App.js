import React from 'react';
import logo from './logo.svg';
import './App.css';
import TodoContainer from './Components/TodoContainer'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        oh.tasks
      </header>
      <div className="todo-container">
        <TodoContainer />
      </div>
    </div>
  );
}

export default App;
