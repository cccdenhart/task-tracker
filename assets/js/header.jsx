import React from 'react';
import { Link } from 'react-router-dom';

export default function Header(props) {
  let {root, session} = props;
  return <div className="row my-2">
    <div className="col-4">
      <h1><Link to={"/"} onClick={root.fetch_tasks.bind(root)}>Task Organizer</Link></h1>
    </div>
    <div className="col-2">
      <p><Link to={"/users"} onClick={root.fetch_users.bind(root)}>Users</Link></p>
    </div>
    <div className="col-6">
      <Login root={root} session={session} />;
    </div>
  </div>;
}

function Login(props) {
  let {root, session} = props;
  if (session === null) {
    return <form className="form-inline my-2">
      <input id="email-login" type="email" placeholder="email" />
      <input id="pword-login" type="password" placeholder="password" />
      <button className="btn btn-secondary" onClick={() => root.handle_login}>Login</button>
    </form>;
  }
  return <div>
    <button className="btn btn-secondary">Log Out</button>
  </div>;
}
