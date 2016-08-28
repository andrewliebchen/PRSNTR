import React, { PropTypes } from 'react';
import Icon from './Icons.jsx';

const SlideAction = (props) =>
  <a
    className="admin__slide__action block block__small"
    onClick={props.handleClick}
    data-tip
    data-for={props.tip}
    data-place="bottom">
    <Icon type={props.type} size="1.5rem"/>
  </a>

SlideAction.propTypes = {
  handleClick: PropTypes.func,
  tip: PropTypes.string,
  defaultType: PropTypes.string
};

export default SlideAction;
