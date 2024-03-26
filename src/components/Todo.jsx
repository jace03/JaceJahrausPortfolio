import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Fade from 'react-reveal';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';
import '../css/Todo.css';

function Todo(props) {
  const { header } = props;
  const [data, setData] = useState(null);
  const [newTodo, setNewTodo] = useState(''); // Initialize newTodo state
  const [todos, setTodos] = useState([]); // Initialize todos state

  useEffect(() => {
    fetch(endpoints.todo, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  const addTodo = () => {
    // Logic to add new todo
    // Example: Assuming newTodo is added to todos array
    setTodos([...todos, { id: todos.length + 1, task: newTodo, completed: false }]);
    setNewTodo(''); // Clear input after adding todo
  };

  const moveUp = (index) => {
    // Logic to move todo up in the array
    if (index > 0) {
      const newTodos = [...todos];
      const temp = newTodos[index];
      newTodos[index] = newTodos[index - 1];
      newTodos[index - 1] = temp;
      setTodos(newTodos);
    }
  };

  const moveDown = (index) => {
    // Logic to move todo down in the array
    if (index < todos.length - 1) {
      const newTodos = [...todos];
      const temp = newTodos[index];
      newTodos[index] = newTodos[index + 1];
      newTodos[index + 1] = temp;
      setTodos(newTodos);
    }
  };

  const deleteTodo = (index) => {
    // Logic to delete todo from the array
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const printTodos = () => {
    // Logic to print todos
    console.log(todos);
  };

  return (
    <>
      <Header title={header} />
      <div className="section-content-container">
        <Container>
          {data
            ? (
              <Fade>
                <div className="todo-container">
                  <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Enter a new todo"
                    className="todo-input"
                  />
                  <Button onClick={addTodo} variant="success">Add Todo</Button>
                  <Button onClick={printTodos} variant="info">Print Todos</Button>
                  <ul className="todo-list">
                    {todos.map((todo, index) => (
                      <li key={todo.id} className="todo-item">
                        <span>{todo.task}</span>
                        <div>
                          <Button onClick={() => moveUp(index)} variant="light" className="todo-button">↑</Button>
                          <Button onClick={() => moveDown(index)} variant="light" className="todo-button">↓</Button>
                          <Button onClick={() => deleteTodo(index)} variant="danger" className="todo-button">✕</Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </Fade>
            )
            : <FallbackSpinner />}
        </Container>
      </div>
    </>
  );
}

Todo.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Todo;
