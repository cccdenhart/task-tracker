import React from 'react';
import _ from 'lodash';

export default function TaskList(props) {
  let {root, tasks, users} = props;
  let all_t = _.map(props.tasks, (t) => <Task key={t.id} task={t} />);
  return <div>
    <br />
    <div className="row">
      {all_t} <br />
    </div>
    <br />
    <br />
    <div className="row">
      <AddTask root={root} users={users} />
    </div>
  </div>;
}

function Task(props) {
  let {root, task} = props;
  let changed = (ev) => {
    root.update_add_cart_count(task.id, ev.target.value);
  };

  return <div className="card col-4">
    <div className="card-body">
      <h2 className="card-title">{task.title}</h2>
      <p className="card-text">
        description: {task.description} <br />
        owner: {task.username} <br />
        duration: {task.duration} <br />
        complete: {task.is_complete ? "yes" : "no"}
      </p>
    </div>
  </div>;
}

function AddTask(props) {
  let {root, users} = props;
  let all_u = _.map(props.users, (u) => <ShowUsers key={u.id} user={u} />);
  return <div>
    <h2>Add a Task</h2>
    <form>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input className="form-control" type="text" id="title" placeholder="Enter title" />
      </div>
      <div className="form-group">
        <label htmlFor="desc">Description</label>
        <input className="form-control" type="text" id="desc" placeholder="Enter Description" />
      </div>
      <div className="form-group">
        <label htmlFor="user">User</label>
        <select className="form-control" type="text" id="user">
          {all_u}
        </select>
      </div>
      <div className="form-group">
        <button type="submit" className="btn btn-primary" onClick={() => root.add_task()}>Add Task</button>
      </div>
    </form>
  </div>;
}

function ShowUsers(props) {
  let {user} = props;
  return <option>{user.email}</option>;
}
