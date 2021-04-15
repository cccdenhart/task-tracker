import React from "react";
import { Link } from "react-router-dom";

export default function Footer(props) {
  let { root } = props;
  return (
    <div className="row my-4">
      <div className="col-4 text-center">
        <p>
          <Link to={"/users"} onClick={root.fetch_users.bind(root)}>
            <button className="btn btn-warning">View Users</button>
          </Link>
        </p>
      </div>
      <div className="col-4 text-center">
        <button className="btn btn-warning" onClick={() => root.log_out()}>
          Log Out
        </button>
      </div>
      <div className="col-4 text-center">
        <button
          className="btn btn-warning"
          onClick={() => root.switch_to_register()}
        >
          Register User
        </button>
      </div>
    </div>
  );
}
