import React, { Component, PropTypes } from 'react';
import ReactMarkdown from 'react-markdown';

export default class Slide extends Component {
  render() {
    const { slide, prefix, children } = this.props;
    return (
      <div className={`slide ${prefix}__slide`}>
        {slide.type === 'image' ?
          <img
            className="slide__content__image"
            src={slide.source}/>
        : <ReactMarkdown
            className="slide__content__text"
            source={slide.source}/>}
        {children}
      </div>
    );
  }
}

Slide.propTypes = {
  slide: PropTypes.object,
  prefix: PropTypes.string
};
