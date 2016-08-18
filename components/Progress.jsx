import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Tappable from 'react-tappable';

export default class Progress extends Component {
  render() {
    const { presentation, slides, changeSlide, showProgress } = this.props;
    return (
      <div className="progress">
        {slides.map((slide, i) => {
          const slideClassName = classnames({
            'progress__slide': true,
            'is-current': presentation.currentSlide === i,
            'has-passed': presentation.currentSlide > i
          });
          return (
            <Tappable
              className={slideClassName}
              onTap={changeSlide.bind(null, i - presentation.currentSlide)}
              key={i}/>
          );
        })}
        {showProgress && presentation.time && presentation.time > 0 &&
          <div
            className="progress__progress"
            style={{animationDuration: `${presentation.time * 60}s`}}/>}
      </div>
    );
  }
}

Progress.propTypes = {
  presentation: PropTypes.object,
  slides: PropTypes.array,
  changeSlide: PropTypes.func,
  showProgress: PropTypes.bool
};
