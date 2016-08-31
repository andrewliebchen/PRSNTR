import React, { Component, PropTypes } from 'react';
import ReactTooltip from 'react-tooltip';
import { Accounts, STATES } from 'meteor/std:accounts-ui';
import Overlay from './Overlay.jsx';
import Icon from './Icons.jsx';

export default class Session extends Component {
  constructor(props) {
    super(props);
    this.state = {
      overlay: false
    };
  }

  render() {
    const { currentUser } = this.props;
    return (
      <div
        className="block session"
        data-tip
        data-for={currentUser ? 'logout' : 'login'}>
        <Icon
          type={currentUser ? 'logout' : 'user'}
          size="1.5rem"
          onClick={this.handleSession.bind(this)}/>
        <Overlay
          show={this.state.overlay}
          toggle={this.handleOverlayToggle.bind(this)}>
          <Accounts.ui.LoginForm
            state={STATES.SIGN_IN}
            onSignedInHook={this.handleSignedIn.bind(this)}/>
        </Overlay>
        <ReactTooltip id="logout" effect="solid" class="tooltip">
          Log out of Slides🎉
        </ReactTooltip>
        <ReactTooltip id="login" effect="solid" class="tooltip">
          Log in to Slides🎉
        </ReactTooltip>
      </div>
    );
  }

  handleOverlayToggle() {
    this.setState({overlay: !this.state.overlay});
  }

  handleSession() {
    if (this.props.currentUser) {
      Meteor.logout();
    } else {
      this.setState({overlay: true});
    }
  }

  handleSignedIn() {
    this.setState({overlay: false});
  }
}

Session.propTypes = {
  currentUser: PropTypes.string
};
