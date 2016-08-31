import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { render } from 'react-dom';
import Provider from '../components/Provider.jsx';

Meteor.startup(() => {
  Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY',
  });

  render(<Provider />, document.getElementById('root'));
});
