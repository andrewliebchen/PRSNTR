import React, { Component, PropTypes } from 'react';
import ReactMarkdown from 'react-markdown';

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
          <div className={`slide ${prefix}__slide`} key={i}>
            <div className="slide__content">
              {slide.type === 'image' ?
                <img src={slide.source}/>
              : <ReactMarkdown source={slide.source}/>}
            </div>
          </div>
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
