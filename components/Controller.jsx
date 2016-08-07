import React, { Component, PropTypes } from 'react';
import timer from 'react-timer-hoc';
import moment from 'moment';
import Tappable from 'react-tappable';
import Slides from './Slides.jsx';

const countdown = ({ timer }) =>
  <div className="timer">
    <div className="timer__count">
      {moment(timer.tick * timer.delay).format('mm:ss')}
    </div>
  </div>

const Timer = timer(1000)(countdown);

export default class Controller extends Component {
  render() {
    const { presentation, changeSlide, canReverse, canAdvance, slidesLength } = this.props;
    return (
      <div className="controller container__inverse">
        <div className="top">
          <Timer/>
          <div className="progress">
            <div className="progress__container">
              {presentation.slides.map((slide, i) =>
                <Tappable
                  className={`progress__slide ${presentation.currentSlide === i ? 'is-current' : null}`}
                  onTap={changeSlide.bind(null, i - presentation.currentSlide)}
                  key={i}>
                  {i + 1}
                </Tappable>
              )}
            </div>
          </div>
        </div>
        <div className="actions bottom">
          <Slides
            slides={presentation.slides}
            currentSlide={presentation.currentSlide}
            prefix="controller"/>
          <Tappable
            className="action action__prev"
            onTap={changeSlide.bind(null, -1)}/>
          <Tappable
            className="action action__next"
            onTap={changeSlide.bind(null, 1)}/>
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
