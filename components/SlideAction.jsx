import React, { PropTypes } from 'react';
import Icon from './Icons.jsx';

const SlideAction = (props) =>
  <a
    className="admin__slide__action block"
    onClick={props.handleClick}
    title={props.title}>
    <Icon type={props.type} size="1.5rem"/>
  </a>

SlideAction.propTypes = {
  handleClick: PropTypes.func,
  title: PropTypes.string,
  defaultType: PropTypes.string
};

export default SlideAction;
