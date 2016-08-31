import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import ReactTooltip from 'react-tooltip';
import Icon from './Icons.jsx';

export default class Action extends Component {
  render() {
    const { disabled, type, handleClick, tipId, tip } = this.props;
    const actionClassName = classnames({
      'block': true,
      'block__narrow': true,
      'is-disabled': disabled
    });

    return (
      <div
        className={actionClassName}
        data-tip
        data-for={tipId}>
        <Icon
          type={type}
          onClick={handleClick}
          size="1.5rem"/>
        <ReactTooltip id={tipId} effect="solid" class="tooltip">
          {tip}
        </ReactTooltip>
      </div>
    );
  }
}

Action.propTypes = {
  disabled: PropTypes.bool,
  type: PropTypes.string,
  handleClick: PropTypes.func,
  tipId: PropTypes.string,
  tip: PropTypes.string
}
