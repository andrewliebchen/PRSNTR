import React from 'react';
import { Accounts } from 'meteor/std:accounts-ui';
import Wrapper from './Wrapper.jsx';

const Login = (props) =>
  <Wrapper
    title="Log in | Slides 🎉"
    className="container__fixed container__blue">
    <div className="centered__content">
      <Accounts.ui.LoginForm />
    </div>
  </Wrapper>

export default Login;
