import React, { Component, PropTypes} from 'react';
import classnames from 'classnames';
import ReactTooltip from 'react-tooltip';
import Options from './Options.jsx';
import Icon from './Icons.jsx';

export default class Header extends Component {
  render() {
    const { presentation, slidesLength, isPresentation, currentUser, children } = this.props;
    const headerClassName = classnames({
      'header': true,
      'is-presentation': isPresentation
    });
    return (
      <header className={headerClassName}>
        <div className="header__left">
          <div className="header__title">
            {presentation.title ? presentation.title : 'Untitled'}
          </div>
          {isPresentation ?
            <div
              className="block"
              data-tip
              data-for="admin">
              <Icon
                type="settings"
                size="1.5rem"
                onClick={this.handleAdminNavigation.bind(this)}/>
            </div>
          : <Options {...this.props}/>}
        </div>
        <div className="header__right">
          {children}
          {!isPresentation &&
            <div
              className="block session"
              data-tip
              data-for={currentUser ? 'logout' : 'login'}>
              <Icon
                type={currentUser ? 'logout' : 'user'}
                size="1.5rem"
                onClick={this.handleSession.bind(this)}/>
            </div>}
        </div>
        {isPresentation &&
          <div className="header__progress">
            <div
              className="header__progress__fill"
              style={{width: `${(presentation.currentSlide + 1) / slidesLength * 100}%`}}/>
          </div>}
        <ReactTooltip id="admin" effect="solid" class="tooltip">
          View settings
        </ReactTooltip>
        <ReactTooltip id="logout" effect="solid" class="tooltip">
          Log out of Slides🎉
        </ReactTooltip>
        <ReactTooltip id="login" effect="solid" class="tooltip">
          Log in to Slides🎉
        </ReactTooltip>
      </header>
    );
  }

  handleAdminNavigation() {
    window.location.href = `/${this.props.presentation._id}/admin`;
  }

  handleSession() {
    if (this.props.currentUser) {
      Meteor.logout();
    } else {
      window.location.href = '/login';
    }
  }
}

Header.propTypes = {
  presentation: PropTypes.object,
  slidesLength: PropTypes.number,
  currentUser: PropTypes.string,
  isPresentation: PropTypes.bool
};
