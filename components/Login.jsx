import React, { Component } from 'react';
import { Accounts, STATES } from 'meteor/std:accounts-ui';
import DocumentTitle from 'react-document-title';
import Logo from './Logo.jsx';

export default class Login extends Component {
  render() {
    return (
      <DocumentTitle
        title="Log in | Slides 🎉">
        <div className="container__fixed container__blue">
          <div className="centered__content">
            <Logo color="light" size="6rem" className="logo__special"/>
            <Accounts.ui.LoginForm state={STATES.SIGN_IN}/>
          </div>
        </div>
      </DocumentTitle>
    );
  }
}
