import React from "react";
import ReactDOM from "react-dom";
import _ from "lodash";
import $ from "jquery";
import { Link, BrowserRouter as Router, Route } from "react-router-dom";

import UserList from "./user_list";
import TaskList from "./task_list";
import Header from "./header";
import AddTask from "./add_task";
import AddUser from "./add_user";
import Footer from "./footer";

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
      is_adding: false,
      is_registering: false,
      cur_user: null
    };

    this.fetch_tasks();
    this.fetch_users();
    if (this.state.cur_user != null) {
      this.create_session(this.state.cur_user.email, this.state.cur_user.pword);
    }
  }

  fetch_tasks() {
    $.ajax("/api/v1/tasks", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: "",
      success: resp => {
        let state1 = _.assign({}, this.state, { tasks: resp.data });
        this.setState(state1);
      }
    });
  }

  fetch_users() {
    $.ajax("/api/v1/users", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: "",
      success: resp => {
        let state1 = _.assign({}, this.state, { users: resp.data });
        this.setState(state1);
      }
    });
  }

  send_post(path, req, on_success) {
    $.ajax(path, {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(req),
      success: on_success
    });
  }

  get_user_by_email(email) {
    user = _.find(this.state.users, function(u) {
      return u.email === email;
    });
    return user.id;
  }

  create_session(email, password) {
    $.ajax("/api/v1/sessions", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({ email, password }),
      success: resp => {
        let state1 = _.assign({}, this.state, { session: resp.data });
        this.setState(state1);
      }
    });
  }

  login() {
    let email = document.getElementById("email-login").value;
    let pword = document.getElementById("pword-login").value;
    console.log("email type: ", typeof email);
    console.log("pword type: ", typeof pword);
    let state1 = _.assign({}, this.state, {
      cur_user: this.get_user_by_email(email)
    });
    this.setState(state1);
  }

  log_out() {
    let state1 = _.assign({}, this.state, { session: null });
    this.setState(state1);
  }

  add_user() {
    let email = document.getElementById("email").value;
    let pword = document.getElementById("pword").value;
    this.send_post("/api/v1/users", { email, pword }, resp => {
      let users1 = _.concat(this.state.users, [resp.data]);
      let state1 = _.assign({}, this.state, { users: users1 });
      this.setState(state1);
    });
  }

  switch_to_register() {
    let state1 = _.assign({}, this.state, { is_registering: true });
    this.setState(state1);
  }

  add_task() {
    let title = document.getElementById("title").value;
    let desc = document.getElementById("desc").value;
    let user = document.getElementById("user").value;
    let user_id = this.get_user_by_email(user).id;
    this.send_post("/api/v1/tasks", { title, desc, user, user_id }, resp => {
      let tasks1 = _.concat(this.state.tasks, [resp.data]);
      let state1 = _.assign({}, this.state, { tasks: tasks1 });
      this.setState(state1);
    });
  }

  switch_to_add() {
    let state1 = _.assign({}, this.state, { is_adding: true });
    this.setState(state1);
  }

  to_home() {
    console.log("TOHOME");
    let state1 = _.assign({}, this.state, {
      is_adding: false,
      is_registering: false
    });
    this.fetch_tasks.bind(this);
    this.setState(state1);
  }

  render() {
    let main;

    if (this.state.is_adding) {
      main = (
        <AddTask
          root={this}
          users={this.state.users}
          is_adding={this.state.is_adding}
        />
      );
    } else if (this.state.is_registering) {
      main = <AddUser root={this} />;
    } else {
      main = <TaskList root={this} tasks={this.state.tasks} />;
    }

    return (
      <div>
        <Router>
          <div>
            <Header root={this} session={this.state.session} />
            <Route path="/" exact={true} render={() => <div>{main}</div>} />
            <Route
              path="/users"
              exact={true}
              render={() => <UserList users={this.state.users} />}
            />
            <Footer root={this} />
          </div>
        </Router>
      </div>
    );
  }
}
