import React, { useState, useRef, useEffect } from 'react';
import { todosData } from '../todos';
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
const AddTodo = ({ clickHandler }) => {
  const [inputText, setInputText] = useState('');
  const inputRef = useRef(null);

  return (
    <div className="input-group">
      <input
        type="text"
        className="form-control"
        placeholder="Todo"
        aria-label="Todo"
        ref={inputRef}
        onChange={(e) => {
          setInputText(inputRef.current.value);
        }}
        required
      />
      <button
        className="btn btn-outline-secondary"
        type="button"
        id="button-addon"
        disabled={inputText.length === 0}
        onClick={(e) => {
          clickHandler(inputText);
          setInputText('');
          inputRef.current.value = '';
        }}
      >
        +
      </button>
    </div>
  );
};

AddTodo.propTypes = {
  clickHandler: PropTypes.func,
};

const TodoApp = ({ title, currentTodoList }) => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setTodos(currentTodoList);
      setIsLoading(false);
    }, 3000);
  }, [currentTodoList]);

  const addTodoHandler = (value) => {
    const newTodo = {
      id: id++,
      checked: false,
      value: value,
    };
    setTodos([...todos, newTodo]);
  };

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
    <div className="container-fluid">
      <div className="row">
        <div className="col text-center">{title}</div>
      </div>
      <div className="row">
        <div className="col">
          <AddTodo clickHandler={addTodoHandler} />
        </div>
      </div>
      {isLoading === true ? (
        <div>is Loading... </div>
      ) : (
        <div className="row">
          <div className="col">
            <div className="list-group">{todoList}</div>
          </div>
        </div>
      )}
    </div>
  );
};

TodoApp.propTypes = {
  currentTodoList: PropTypes.array,
  title: PropTypes.string,
};

const TodoFullApp = () => {
  const [todoLists, setTodoLists] = useState([
    { title: `Todos List 1`, todos: todosData },
    {
      title: 'Todos List 2',
      todos: [
        {
          id: 0,
          checked: false,
          value: 'Hey Paul',
        },
      ],
    },
  ]);

  const [currentTodoList, setCurrentTodoList] = useState(todoLists[0]);

  const htmlTodoList = todoLists.map((todoList, index) => (
    <div className="bg-light border" key={index}>
      {todoList.title}
    </div>
  ));

  console.log(currentTodoList);
  console.log(currentTodoList.title);
  console.log(currentTodoList.todos);
  return (
    <>
      <div className="hNav">
        <div className="vstack">
          {htmlTodoList}
          <div className="bg-light border text-center">
            <button
              className="btn btn-outline-secondary"
              type="button"
              id="button-addon"
              onClick={() => {
                const newTodoList = `Todos List`;
                setTodoLists([...todoLists, { title: newTodoList, todos: [] }]);
              }}
            >
              +
            </button>
          </div>
        </div>
      </div>
      <TodoApp
        title={currentTodoList.title}
        currentTodoList={currentTodoList.todos}
      />
    </>
  );
};

export default TodoFullApp;
