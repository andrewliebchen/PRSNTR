import React, { PropTypes } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import Icon from './Icons.jsx';

const Overlay = (props) =>
  <CSSTransitionGroup
    transitionName="zoom-in"
    transitionEnterTimeout={200}
    transitionLeaveTimeout={200}>
    {props.show &&
      <div className="overlay container__fixed container__blue">
        <div className="centered__content">
          {props.children}
        </div>
        <a
          className="overlay__toggle"
          onClick={props.toggle}>
          <Icon type="close" size="3rem"/>
        </a>
      </div>}
  </CSSTransitionGroup>

Overlay.propTypes = {
  show: PropTypes.bool,
  toggle: PropTypes.func
};

export default Overlay;
