import React, { Component, PropTypes} from 'react';
import classnames from 'classnames';
import Settings from './Settings.jsx';
import Icon from './Icons.jsx';

export default class Header extends Component {
  render() {
    const { presentation, slidesLength, showProgress, children } = this.props;
    const headerClassName = classnames({
      'header': true,
      'show-progress': showProgress
    });
    return (
      <header className={headerClassName}>
        <div className="header__left">
          <div className="header__title">
            {presentation.title ? presentation.title : 'Untitled'}
          </div>
          <Settings {...this.props}/>
          <div className="block">
            <Icon
              type="user"
              size="1.5rem"
              title="Account"/>
          </div>
        </div>
        <div className="header__right">
          {children}
        </div>
        {showProgress &&
          <div className="header__progress">
            <div
              className="header__progress__fill"
              style={{width: `${(presentation.currentSlide + 1) / slidesLength * 100}%`}}/>
          </div>}
      </header>
    );
  }
}

Header.propTypes = {
  presentation: PropTypes.object,
  slidesLength: PropTypes.number,
  showProgress: PropTypes.bool
};
