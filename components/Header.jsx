import React, { Component, PropTypes} from 'react';
import classnames from 'classnames';
import Settings from './Settings.jsx';
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
            <div className="block">
              <Icon
                type="settings"
                size="1.5rem"
                title="Account"
                onClick={this.handleAdminNavigation.bind(this)}/>
            </div>
          : <Settings {...this.props}/>}
        </div>
        <div className="header__right">
          {children}
          {!isPresentation &&
            <div className="block session">
              <Icon
                type={currentUser ? 'logout' : 'user'}
                size="1.5rem"
                title="Account"
                onClick={this.handleSession.bind(this)}/>
            </div>}
        </div>
        {isPresentation &&
          <div className="header__progress">
            <div
              className="header__progress__fill"
              style={{width: `${(presentation.currentSlide + 1) / slidesLength * 100}%`}}/>
          </div>}
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
