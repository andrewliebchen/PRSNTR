import React, { Component, PropTypes } from 'react';
import Slide from './Slide.jsx';

export default class Slides extends Component {
  render() {
    const { slides, currentSlide, prefix } = this.props;
    const slidesStyle = {
      width: `${slides.length * 100}vw`,
      transform: `translateX(-${currentSlide * 100}vw)`
    };

    return (
      <div className={`slides ${prefix}__slides`} style={slidesStyle}>
        {slides.map((slide, i) =>
          <Slide
            key={i}
            slide={slide}
            prefix={prefix}/>
        )}
      </div>
    );
  }
}

Slides.propTypes = {
  slides: PropTypes.array,
  currentSlide: PropTypes.number,
  prefix: PropTypes.string
};
