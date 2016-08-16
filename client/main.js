import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { render } from 'react-dom';
import App from '../components/App.jsx';

Meteor.startup(() => {
  Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY',
  });

  render(<App />, document.getElementById('root'));
});
