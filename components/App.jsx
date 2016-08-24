import React, { Component } from 'react';
import { Router, Route, browserHistory } from 'react-router';
import Presentation from './Presentation.jsx';
import Admin from './Admin.jsx';
import NewPresentation from './NewPresentation.jsx';
import Login from './Login.jsx';

export default class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/login" component={Login}/>
        <Route path="/new" component={NewPresentation}/>
        <Route path="/:id" component={Presentation}/>
        <Route path="/:id/admin" component={Admin}/>
      </Router>
    );
  }
}
