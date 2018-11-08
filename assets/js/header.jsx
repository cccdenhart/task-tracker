import React from "react";
import { Link } from "react-router-dom";

export default function Header(props) {
  let { root, session } = props;
  return (
    <div className="d-flex justify-content-between my-4">
      <div>
        <h2>
          <Link to={"/"} onClick={root.fetch_tasks.bind(root)}>
            Task Organizer
          </Link>
        </h2>
      </div>
      <div>
        <Login root={root} session={session} />
      </div>
    </div>
  );
}

function Login(props) {
  let { root, session } = props;
  if (session === null) {
    return (
      <form className="form-inline mp-2">
        <input id="email-login" type="email" placeholder="email" />
        <input id="pword-login" type="password" placeholder="password" />
        <button className="btn btn-secondary" onClick={() => root.login()}>
          Login
        </button>
      </form>
    );
  }
  return (
    <div>
      <button className="btn btn-secondary">Log Out</button>
    </div>
  );
}
