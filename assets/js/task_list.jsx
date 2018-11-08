import React from "react";
import _ from "lodash";

export default function TaskList(props) {
  let { root, tasks } = props;
  let all_t = _.map(tasks, t => <Task key={t.id} task={t} />);
  return (
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col-4 text-center">
          <button
            className="btn btn-primary btn-lg"
            onClick={() => root.switch_to_add()}
          >
            Add Task
          </button>
        </div>
      </div>
      <br />
      <div className="row">{all_t}</div>
    </div>
  );
}

function Task(props) {
  let { task } = props;
  let changed = ev => {
    root.update_add_cart_count(task.id, ev.target.value);
  };
  return (
    <div className="card col-4 border-secondary mb-3">
      <div className="card-header">
        <h2>{task.title}</h2>
      </div>
      <ul className="list-group ">
        <li className="list-group-item">description: {task.description}</li>
        <li className="list-group-item">owner: {task.username}</li>
        <li className="list-group-item">duration: {task.duration}</li>
        <li className="list-group-item">
          complete: {task.is_complete ? "yes" : "no"}
        </li>
      </ul>
    </div>
  );
}
