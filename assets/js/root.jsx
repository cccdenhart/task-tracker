import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import $ from 'jquery';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';

import UserList from './user_list';
import TaskList from './task_list';
import Header from './header';

export default function root_init(node) {
  let all_tasks = window.tasks;
  ReactDOM.render(<Root tasks={all_tasks} />, node);
}

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: props.tasks,
      users: [],
      session: null,
    };

    this.fetch_tasks();
    this.fetch_users();
    //this.create_session("alice@example.com", "pass1");
  }

  fetch_tasks() {
    $.ajax("/api/v1/tasks", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: "",
      success: (resp) => {
        let state1 = _.assign({}, this.state, { tasks: resp.data });
        this.setState(state1);
      },
    });
  }

  fetch_users() {
    $.ajax("/api/v1/users", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: "",
      success: (resp) => {
        let state1 = _.assign({}, this.state, { users: resp.data });
        this.setState(state1);
      },
    });
  }

  send_post(path, req, on_success) {
    $.ajax(path, {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(req),
      success: on_success,
    });
  }

  get_user_by_email(email) {
    user = _.find(this.state.users, function(u) {return u.email === email; });
    return user.id;
  }

  create_session(email, password) {
    $.ajax("/api/v1/sessions", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({email, password}),
      success: (resp) => {
        let state1 = _.assign({}, this.state, { session: resp.data });
        this.setState(state1);
      }
    });
  }

  handle_login() {
    let email = document.getElementById("email-login").value;
    let pword = document.getElementById("pword-login").value;
    console.log("email type: ", typeof email);
    console.log("pword type: ", typeof pword);
    this.create_session(email, pword);
  }

  add_task() {
    let title = document.getElementById("title").value;
    let desc = document.getElementById("desc").value;
    let user = document.getElementById("user").value;
    let user_id = this.get_user_by_email(user).id;
    $.ajax("/api/v1/tasks", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({title, desc, user, user_id}),
      success: (resp) => {
        let state1 = _.assign({}, this.state, { tasks: resp.data });
        this.setState(state1);
      }
    });
  }

  render() {
    return <div>
      <Router>
        <div>
          <Header root={this} session={this.state.session} />
          <Route path="/" exact={true} render={() =>
            <div>
              <TaskList tasks={this.state.tasks} users={this.state.users} root={this} />
            </div>
          } />
          <Route path="/users" exact={true} render={() =>
            <UserList users={this.state.users} />
          } />
        </div>
      </Router>
    </div>;
  }
}
