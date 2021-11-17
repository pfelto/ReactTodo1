import React, { useState } from 'react';
import PropTypes from 'prop-types';

let id = 3;

const TodoCheck = ({ value, checked, changeHandler }) => {
  return (
    <input
      type="checkbox"
      value={value}
      onChange={changeHandler}
      checked={checked}
    />
  );
};

TodoCheck.propTypes = {
  value: PropTypes.string,
  changeHandler: PropTypes.func,
  checked: PropTypes.bool,
};

const TodoDelete = ({ clickHandler }) => {
  return (
    <button
      className="btn btn-outline-secondary"
      type="button"
      id="button-addon"
      onClick={clickHandler}
    >
      X
    </button>
  );
};

TodoDelete.propTypes = {
  clickHandler: PropTypes.func,
};

const Todo = ({
  todo: { id, value, checked },
  clickHandler,
  changeHandler,
}) => {
  const className = checked !== true ? 'col-10' : 'col-10 line-thru';
  return (
    <div className="list-group-item">
      <div className="container">
        <div className="row ">
          <div className="col-1">
            <TodoCheck
              value={value}
              checked={checked}
              changeHandler={() => {
                changeHandler(id);
              }}
            />
          </div>
          <div className={className}>{value}</div>
          <div className="col-1">
            <TodoDelete
              clickHandler={() => {
                clickHandler(id);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

Todo.propTypes = {
  todo: PropTypes.object,
  clickHandler: PropTypes.func,
  changeHandler: PropTypes.func,
};
//Need to get the info from text input on click and pass that to todo list to update state
const AddTodo = () => {
  return (
    <div className="input-group">
      <input
        type="text"
        className="form-control"
        placeholder="Todo"
        aria-label="Todo"
        required
      />
      <button
        className="btn btn-outline-secondary"
        type="button"
        id="button-addon"
        onClick={(e) => {
          console.log(e.target.value);
        }}
      >
        +
      </button>
    </div>
  );
};

const TodoApp = () => {
  const [todos, setTodos] = useState([
    {
      id: 0,
      checked: false,
      value: 'Hey Slut',
    },
    {
      id: 1,
      checked: false,
      value: 'Hey Bitch',
    },
    {
      id: 2,
      checked: true,
      value: 'Hey Ho',
    },
  ]);

  const TodoClickHandler = (id) => {
    const newTodos = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(newTodos);
  };

  const TodoChangeHandler = (id) => {
    const updatedTodos = todos.map((x) =>
      x.id === id ? { ...x, checked: !x.checked } : x
    );
    setTodos(updatedTodos);
  };

  const todoList = todos.map((todo, i) => (
    <Todo
      key={i}
      todo={todo}
      clickHandler={TodoClickHandler}
      changeHandler={TodoChangeHandler}
    />
  ));

  return (
    <>
      <div className="hNav">
        <div className="vstack">
          <div className="bg-light border">First Todos List</div>
          <div className="bg-light border">Second Todos List</div>
          <div className="bg-light border">Third Todos List</div>
          <div className="bg-light border text-center">
            <button
              className="btn btn-outline-secondary"
              type="button"
              id="button-addon"
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col text-center">Todos List Header</div>
        </div>
        <div className="row">
          <div className="col">
            <AddTodo />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="list-group">{todoList}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoApp;
