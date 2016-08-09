import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Tappable from 'react-tappable';

export default class Progress extends Component {
  render() {
    const { presentation, changeSlide } = this.props;
    return (
      <div className="progress">
        {presentation.slides.map((slide, i) => {
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
      </div>
    );
  }
}

Progress.propTypes = {
  presentation: PropTypes.object,
  changeSlide: PropTypes.func
};
