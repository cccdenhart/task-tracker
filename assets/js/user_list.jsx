import React from 'react';

// taken from Nat's Notes
export default function UserList(props) {
  let rows = _.map(props.users, (uu) => <User key={uu.id} user={uu} />);
  console.log("user: ", props.users);
  return <div className="row">
    <div className="col-12">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>email</th>
            <th>admin?</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  </div>;
}

function User(props) {
  let {user} = props;
  return <tr>
    <td>{user.email}</td>
    <td>{user.admin ? "yes" : "no"}</td>
  </tr>;
}
