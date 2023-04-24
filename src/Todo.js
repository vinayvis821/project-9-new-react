import "./App.css";

function Todo(props) {
  return (
    <div className="todo" id={props.id}>
      <div className="task">
        <input
          className="checkbox-styling"
          type="checkbox"
          checked={props.completed ? true : false}
          onChange={() => props.checkBox(props.id)}
        ></input>
        <p className={props.completed ? "completed" : "not-completed"}>
          {props.text}
        </p>
        <button type="submit" onClick={() => props.delete(props.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default Todo;
