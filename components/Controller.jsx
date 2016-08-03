import React, { Component, PropTypes } from 'react';
import timer from 'react-timer-hoc';
import moment from 'moment';

const countdown = ({ timer }) =>
  <div className="timer">
    {moment(timer.tick * timer.delay).format('mm:ss')}
  </div>

const Timer = timer(1000)(countdown);

export default class Controller extends Component {
  render() {
    const { presentation, changeSlide, canReverse, canAdvance, slidesLength } = this.props;
    return (
      <div className="controller">
        <Timer/>
        <div className="progress"/>
        <div className="actions">
          <button
            onClick={changeSlide.bind(null, 'prev')}
            disabled={!canReverse}>
            Prev
          </button>
          <button
            onClick={changeSlide.bind(null, 'next')}
            disabled={!canAdvance}>
            Next
          </button>
        </div>
      </div>
    );
  }
}

Controller.propTypes = {
  presentation: PropTypes.object,
  changeSlide: PropTypes.func,
  canReverse: PropTypes.bool,
  canAdvance: PropTypes.bool,
  slidesLength: PropTypes.number
};
