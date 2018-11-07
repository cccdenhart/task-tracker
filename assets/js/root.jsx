import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import $ from 'jquery';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';

import UserList from './user_list';
import TaskList from './task_list';
import Header from './header';

export default function root_init(node) {
  let prods = window.tasks;
  ReactDOM.render(<Root tasks={prods} />, node);
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

  handle_login(e) {
    e.preventDefault();
    let email = document.getElementById("email-login").value;
    let pword = document.getElementById("pword-login").value;
    console.log("email: ", email);
    console.log("pword: ", pword);
    this.create_session(email, pword);
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

  add_task() {
    let user_id = this.state.session.user_id;

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
