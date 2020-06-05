import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './pages/login';
import Select from "./pages/select"
import Add from "./pages/add"
import Alter from "./pages/alter"
import Delete from "./pages/delete"


import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from "react-router-dom";


ReactDOM.render(
      <Router>
      <Switch>
          <Route path="/login" component={Login}/>
          <Route path="/select" component={Select}/>
          <Route path="/add" component={Add}/>
          <Route path="/alter" component={Alter}/>
          <Route path="/delete" component={Delete}/>
          <Redirect from="/" to="/login"/>
      </Switch>
      </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
