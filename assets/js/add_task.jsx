import React from "react";

export default function AddTask(props) {
  let { root, users } = props;
  let all_u = _.map(props.users, u => <ShowUsers key={u.id} user={u} />);
  return (
    <div>
      <h2>Add a Task</h2>
      <form>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            className="form-control"
            type="text"
            id="title"
            placeholder="Enter title"
          />
        </div>
        <div className="form-group">
          <label htmlFor="desc">Description</label>
          <input
            className="form-control"
            type="text"
            id="desc"
            placeholder="Enter Description"
          />
        </div>
        <div className="form-group">
          <label htmlFor="user">User</label>
          <select className="form-control" type="text" id="user">
            {all_u}
          </select>
        </div>
        <div className="form-group">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={() => root.add_task()}
          >
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
}

function ShowUsers(props) {
  let { user } = props;
  return <option>{user.email}</option>;
}
