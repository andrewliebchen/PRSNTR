import React, { PropTypes } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import Icon from './Icons.jsx';

const Overlay = (props) =>
  <CSSTransitionGroup
    transitionName="overlay"
    transitionEnterTimeout={250}
    transitionLeaveTimeout={200}>
    {props.show &&
      <div className="overlay">
        <div className="overlay__content">
          {props.children}
        </div>
        <a
          className="overlay__toggle"
          onClick={props.toggle}>
          <Icon type="close" size="2rem"/>
        </a>
      </div>}
  </CSSTransitionGroup>

Overlay.propTypes = {
  show: PropTypes.bool,
  toggle: PropTypes.func
};

export default Overlay;
