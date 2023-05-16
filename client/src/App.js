import React from 'react';
import "./App.css";
import {Container} from 'react-bootstrap';
import TodoList from './components/to-do-list';

function App() {
  return (
    <div className="App">
      <Container>
        <TodoList />
      </Container>
      </div>
  );
}

export default App;