import React, { Component, PropTypes } from 'react';
import timer from 'react-timer-hoc';
import moment from 'moment';
import Slides from './Slides.jsx';

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
        <div className="progress">
          <div className="progress__container">
            {presentation.slides.map((slide, i) =>
              <div
                className={`progress__slide ${presentation.currentSlide === i ? 'is-current' : null}`}
                key={i}>
                {i + 1}
              </div>
            )}
          </div>
        </div>
        <div className="action">
          <div
            className="action__slide action__slide__prev"
            onClick={changeSlide.bind(null, 'prev')}
            disabled={!canReverse}/>
          <div
            className="action__slide action__slide__next"
            onClick={changeSlide.bind(null, 'next')}
            disabled={!canAdvance}/>
          <Slides slides={presentation.slides} currentSlide={presentation.currentSlide}/>
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
