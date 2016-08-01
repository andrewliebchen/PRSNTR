import React, { Component } from 'react';
import { Router, Route, browserHistory } from 'react-router';
import Presentation from './Presentation.jsx';

export default class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/:id" component={Presentation}/>
      </Router>
    );
  }
}
