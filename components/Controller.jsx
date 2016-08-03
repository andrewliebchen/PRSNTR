import React, { Component, PropTypes } from 'react';

export default class Controller extends Component {
  render() {
    const { presentation, changeSlide, canReverse, canAdvance, slidesLength } = this.props;
    return (
      <div>
        <div>
          Slide {presentation.currentSlide + 1} / {slidesLength}
        </div>
        <div className="slides__actions">
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
