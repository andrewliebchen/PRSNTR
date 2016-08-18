import React, { Component, PropTypes } from 'react';
import Tappable from 'react-tappable';
import SlidesList from './SlidesList.jsx';
import Progress from './Progress.jsx';
import Timer from './Timer.jsx';

export default class Controller extends Component {
  render() {
    const { presentation, slides, changeSlide, canReverse, canAdvance } = this.props;
    return (
      <div className="controller container__inverse">
        <div className="top">
          <Timer presentation={presentation} stopwatch/>
          <div className="controller__progress">
            <Progress {...this.props} showProgress/>
          </div>
        </div>
        <div className="actions bottom">
          <SlidesList
            slides={slides}
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
  slides: PropTypes.array,
  changeSlide: PropTypes.func,
  canReverse: PropTypes.bool,
  canAdvance: PropTypes.bool
};
