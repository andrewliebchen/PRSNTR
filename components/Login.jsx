import React, { Component } from 'react';
import { Accounts, STATES } from 'meteor/std:accounts-ui';
import Wrapper from './Wrapper.jsx';

export default class Login extends Component {
  render() {
    return (
      <Wrapper
        title="Log in | Slides 🎉"
        className="container__fixed container__blue">
        <div className="centered__content">
          <Accounts.ui.LoginForm
            state={STATES.SIGN_IN}
            onSignedInHook={this.handleSignedIn.bind(this)} />
        </div>
      </Wrapper>
    );
  }

  handleSignedIn() {
    const redirect = this.props.location.query ? this.props.location.query.redirect : null;
    if (redirect) {
      window.location.href = `/${redirect}/admin`;
    } else {
      window.location.href = '/new';
    }
  }
}
