import React, { Component, PropTypes } from 'react';
import ReactMarkdown from 'react-markdown';
import classnames from 'classnames';

export default class Slide extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps !== this.props;
  }

  render() {
    const { slide, prefix, children, isDragOver, dragStart, dragEnd, dragOver, draggable } = this.props;
    const slideClassName = classnames({
      'slide': true,
      'slide__inverse': slide.darkBackground,
      'is-dragover': isDragOver
    });
    return (
      <div
        className={`${slideClassName} ${prefix}__slide`}
        onDragStart={dragStart.bind(null, slide)}
        onDragEnd={dragEnd.bind(null, slide)}
        onDragOver={dragOver.bind(null, slide)}
        draggable={draggable}>
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
  prefix: PropTypes.string,
  isDragOver: PropTypes.bool,
  dragStart: PropTypes.func,
  dragEnd: PropTypes.func,
  dragOver: PropTypes.func,
  draggable: PropTypes.bool
};
