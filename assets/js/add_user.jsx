import React from "react";

export default function AddUser(props) {
  let { root } = props;
  return (
    <div>
      <h2>Register</h2>
      <form>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            className="form-control"
            type="text"
            id="email"
            placeholder="Enter email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="pword">Password</label>
          <input
            className="form-control"
            type="text"
            id="pword"
            placeholder="Enter password"
          />
        </div>
        <div className="form-group">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={() => root.add_user()}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
