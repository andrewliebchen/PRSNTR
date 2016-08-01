import React, { Component } from 'react';
import { Router, Route, browserHistory } from 'react-router';
import Presentation from './Presentation.jsx';
import Admin from './Admin.jsx'

export default class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/:id" component={Presentation}/>
        <Route path="/:id/admin" component={Admin}/>
      </Router>
    );
  }
}
