import React, { Component } from 'react';
import { Router, Route, browserHistory } from 'react-router';
import App from './App.jsx';
import NewPresentation from './NewPresentation.jsx';
import Login from './Login.jsx';

export default class Provider extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/login" component={Login}/>
        <Route path="/new" component={NewPresentation}/>
        <Route path="/:id" component={App}/>
      </Router>
    );
  }
}
