import React, { Component, PropTypes } from 'react';
import Tappable from 'react-tappable';
import Slides from './Slides.jsx';
import Progress from './Progress.jsx';
import Timer from './Timer.jsx';

export default class Controller extends Component {
  render() {
    const { presentation, changeSlide, canReverse, canAdvance, slidesLength } = this.props;
    return (
      <div className="controller container__inverse">
        <div className="top">
          <Timer presentation={presentation}/>
          <div className="controller__progress">
            <Progress {...this.props} showProgress/>
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
