import { createStore, combineReducers } from "redux";
import deepFreeze from "deep-freeze";

/*
  Application state layout
  {
    products: props.products, // List of Product
    users: [], // List of User
    cart: [], // List of CartItem
    session: null, // { token, user_id }
    add_item_forms: new Map(), // { product_id => count }
  }
*/

// For each component of the state:
//  * Function with the same name
//  * Default is the default value of that component

function tasks(state = [], action) {
  return state;
}

function users(state = [], action) {
  return state;
}

function session(state = null, action) {
  return state;
}

function add_task_forms(state = new Map(), action) {
  switch (action.type) {
    case "UPDATE_ADD_TASK_FORM":
      let state1 = new Map(state);
      state1.set(action.title, action.description, action.username);
      return state1;
    default:
      return state;
  }
}

function add_user_forms(state = new Map(), action) {
  switch (action.type) {
    case "UPDATE_ADD_USER_FORM":
      let state1 = new Map(state);
      state1.set(action.email, action.password);
      return state1;
    default:
      return state;
  }
}

function root_reducer(state0, action) {
  console.log("reducer", state0, action);

  let reducer = combineReducers({
    tasks,
    users,
    session,
    add_user_forms
  });
  let state1 = reducer(state0, action);

  console.log("reducer1", state1);

  return deepFreeze(state1);
}

let store = createStore(root_reducer);
export default store;
