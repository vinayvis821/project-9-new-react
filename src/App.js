import "./App.css";
import NewTodo from "./NewTodo";
import Todo from "./Todo.js";
import React, { useState, useEffect, useContext } from "react";

const APIKey = process.env.REACT_APP_API_KEY;

function App() {
  const [todos, setTodos] = useState([]);
  const [enterApp, setEnterApp] = useState(false);

  // Calls this function only once upon intial reload
  useEffect(() => {
    generateInitialTodos(setTodos);
  }, []);

  if (enterApp) {
    return (
      <div className="App">
        <div className="heading">
          <p>ToDo App (React Implementation)</p>
        </div>
        <div className="todo-form">
          <NewTodo addTask={addTodo} />
        </div>
        <div className="todos-container">
          {todos.sort(sortCriteria).map((todo) => (
            <Todo
              key={todo.id}
              id={todo.id}
              text={todo.text}
              completed={todo.completed}
              delete={deleteTodo}
              checkBox={checkTodo}
            />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="enter-app">
        <button onClick={() => enter(setEnterApp)}>Enter App</button>
      </div>
    );
  }

  function sortCriteria(a, b) {
    return a.completed - b.completed;
  }

  // Add new todo to API and update state
  function addTodo(text) {
    // console.log(text);
    const data = {
      text: text,
    };
    const url = "https://cse204.work/todos";
    fetch(url, {
      method: "POST",
      withCredentials: true,
      headers: {
        "x-api-key": APIKey,
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then(function (data) {
        // console.log(data);
        setTodos([data, ...todos]);
      })
      .catch(function (error) {
        console.log("error: " + error);
      });
  }

  // Delete new todo from API and update state
  function deleteTodo(id) {
    // console.log("delete: " + id);
    const url = "https://cse204.work/todos/" + id;
    fetch(url, {
      method: "DELETE",
      withCredentials: true,
      headers: {
        "x-api-key": APIKey,
      },
    })
      .then(function () {
        const newTodos = todos.filter((todo) => todo.id != id);
        setTodos(newTodos);
      })
      .catch(function (error) {
        console.log("error: " + error);
      });
  }

  // Complete a todo (toggle) and update state
  function checkTodo(id) {
    // console.log("check: " + id);
    let todo = todos.find((todo) => todo.id == id);
    let completedStatus = todo.completed;
    const data = { completed: !completedStatus };

    const url = "https://cse204.work/todos/" + id;
    fetch(url, {
      method: "PUT",
      withCredentials: true,
      headers: {
        "x-api-key": APIKey,
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then(function (data) {
        // completed todos appended to bottom, unchecked todos added to top
        const newTodos = todos.filter((todo) => todo.id != id);
        if (!completedStatus) {
          setTodos([...newTodos, data]);
        } else {
          setTodos([data, ...newTodos]);
        }
      })
      .catch(function (error) {
        console.log("error: " + error);
      });
  }
}

function enter(setEnterApp) {
  setEnterApp(true);
}

// Generate initial todos from API
// Updates state
function generateInitialTodos(setTodos) {
  // Using original XHTTP requests

  // var xhttp = new XMLHttpRequest();
  // xhttp.onreadystatechange = function () {
  //   if (this.readyState == 4 && this.status == 200) {
  //     var todos = JSON.parse(this.responseText);
  //     console.log(todos);
  //   }
  // };
  // xhttp.open("GET", "https://cse204.work/todos", true);
  // xhttp.setRequestHeader("x-api-key", APIKey);
  // xhttp.send();

  // Using the Fetch API

  const url = "https://cse204.work/todos";
  fetch(url, {
    method: "GET",
    withCredentials: true,
    headers: {
      "x-api-key": APIKey,
    },
  })
    .then((response) => response.json())
    .then(function (data) {
      // console.log(data);
      setTodos(data);
    })
    .catch(function (error) {
      console.log("error: " + error);
    });
}

export default App;
