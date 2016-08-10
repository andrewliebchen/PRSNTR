import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Progress from './Progress.jsx';
import Icon from './Icons.jsx';

const Action = (props) =>
  <a className={props.className}
    onClick={props.handleClick}>
    <Icon type={props.type}/>
  </a>

export default class Info extends Component {
  render() {
    const { presentation, changeSlide, canReverse, canAdvance, slidesLength } = this.props;
    return (
      <div className="info">
        <div className="info__progress info__item">
          <Progress
            presentation={presentation}
            changeSlide={changeSlide}/>
        </div>
        <Action
          className={classnames({
            'info__item': true,
            'is-disabled': presentation.currentSlide === 0
          })}
          handleClick={changeSlide.bind(null, -(slidesLength - (slidesLength - presentation.currentSlide)))}
          type="previous"/>
        <Action
          className={classnames({
            'info__item': true,
            'is-disabled': !canReverse
          })}
          handleClick={changeSlide.bind(null, -1)}
          type="rewind"/>
        <Action
          className={classnames({
            'info__item': true,
            'is-disabled': !canAdvance
          })}
          handleClick={changeSlide.bind(null, 1)}
          type="fast-forward"/>
      </div>
    );
  }
}

Info.propTypes = {
  presentation: PropTypes.object,
  changeSlide: PropTypes.func,
  canReverse: PropTypes.bool,
  canAdvance: PropTypes.bool,
  slidesLength: PropTypes.number
};
