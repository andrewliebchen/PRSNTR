import React, { Component, PropTypes} from 'react';
import classnames from 'classnames';
import ReactTooltip from 'react-tooltip';
import Options from './Options.jsx';
import Icon from './Icons.jsx';
import Logo from './Logo.jsx';
import Timer from './Timer.jsx';
import HeaderAction from './HeaderAction.jsx';
import Session from './Session.jsx';

export default class Header extends Component {
  render() {
    const {
      presentation,
      slidesLength,
      isPresentation,
      currentUser,
      toggleGrid,
      canAdvance,
      canReverse,
      changeSlide,
      canEdit
    } = this.props;
    const headerClassName = classnames({
      'header': true,
      'is-presentation': isPresentation,
      'show-grid': !isPresentation
    });

    return (
      <header className={headerClassName}>
        <div className="header__left">
          <a href="/" className="logo__container block">
            <Logo size="2rem" color="dark"/>
          </a>
          <HeaderAction
            handleClick={toggleGrid}
            type={isPresentation ? 'grid' : 'presentation'}
            tipId="grid"
            tip={isPresentation ? 'Show slides' : 'View presentation'}/>
          <div className="header__title">
            {presentation.title ? presentation.title : 'Untitled'}
          </div>
          {canEdit && <Options {...this.props}/>}
        </div>
        <div className="header__right">
          {isPresentation ?
            <Timer presentation={presentation}/>
          : <div className="timer">
              <div className="count">
                {presentation.time}:00
              </div>
            </div>}
          {slidesLength > 1 && isPresentation &&
            <span>
              <HeaderAction
                disabled={presentation.currentSlide === 0}
                handleClick={changeSlide.bind(null, -(slidesLength - (slidesLength - presentation.currentSlide)))}
                type="previous"
                tipId="firstSlide"
                tip="First slide"/>
              <HeaderAction
                disabled={!canReverse}
                handleClick={changeSlide.bind(null, -1)}
                type="rewind"
                tipId="back"
                tip="Previous slide"/>
              <HeaderAction
                disabled={!canAdvance}
                handleClick={changeSlide.bind(null, 1)}
                type="fast-forward"
                tipId="next"
                tip="Next slide"/>
            </span>}
          <Session {...this.props}/>
        </div>

        {isPresentation &&
          <div className="header__progress">
            <div
              className="header__progress__fill"
              style={{width: `${(presentation.currentSlide + 1) / slidesLength * 100}%`}}/>
          </div>}

        <ReactTooltip id="admin" effect="solid" class="tooltip">
          Presentation settings
        </ReactTooltip>

        <div className="header__trigger"/>
      </header>
    );
  }
}

Header.propTypes = {
  presentation: PropTypes.object,
  slidesLength: PropTypes.number,
  currentUser: PropTypes.string,
  isPresentation: PropTypes.bool,
  toggleGrid: PropTypes.func,
  canReverse: PropTypes.bool,
  canAdvance: PropTypes.bool,
  changeSlide: PropTypes.func,
};
