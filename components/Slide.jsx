import React, { Component, PropTypes } from 'react';
import ReactMarkdown from 'react-markdown';
import classnames from 'classnames';

export default class Slide extends Component {
  render() {
    const { slide, prefix, children } = this.props;
    const slideClassName = classnames({
      'slide': true,
      'slide__inverse': slide.darkBackground
    });
    return (
      <div className={`${slideClassName} ${prefix}__slide`}>
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
