import React, { Component, PropTypes } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import Slide from './Slide.jsx';

export default class SlidesList extends Component {
  render() {
    const { slides, currentSlide } = this.props;
    const slidesStyle = {
      width: `${slides.length * 100}vw`,
      transform: `translateX(-${currentSlide * 100}vw)`
    };

    return (
      <div className="presentation container">
        <div className="slides" style={slidesStyle}>
          <CSSTransitionGroup
            transitionName="zoom-in"
            transitionEnterTimeout={250}
            transitionLeaveTimeout={200}>
            {slides.map((slide, i) =>
              <Slide
                key={i}
                slide={slide}
                prefix="presentation"/>
            )}
          </CSSTransitionGroup>
        </div>
      </div>
    );
  }
}

SlidesList.propTypes = {
  slides: PropTypes.array,
  currentSlide: PropTypes.number
};
