import "./App.css";
import { useState } from "react";

function NewTodo(props) {
  const [inputText, setInputText] = useState("");

  return (
    <div className="form">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          addTodo(props.addTask, inputText, setInputText);
        }}
      >
        <input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          type="text"
          placeholder="Add a task"
        ></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

function addTodo(addTodo, inputText, setInputText) {
  // console.log(inputText);
  const input = inputText;
  setInputText("");
  addTodo(input);
}

export default NewTodo;
