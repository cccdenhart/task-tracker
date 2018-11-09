import React from "react";
import ReactDOM from "react-dom";
import _ from "lodash";
import $ from "jquery";
import { Link, BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";

import UserList from "./user_list";
import TaskList from "./task_list";
import Header from "./header";
import AddTask from "./add_task";
import AddUser from "./add_user";
import Footer from "./footer";
import api from "./api";

export default function root_init(node, store) {
  ReactDOM.render(
    <Provider store={store}>
      <Root tasks={window.tasks} />
    </Provider>,
    node
  );
}

class Root extends React.Component {
  constructor(props) {
    super(props);

    this.fetch_tasks();
    this.fetch_users();
    if (this.state.cur_user != null) {
      this.create_session(this.state.cur_user.email, this.state.cur_user.pword);
    }
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
