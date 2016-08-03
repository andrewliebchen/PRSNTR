import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import MobileDetect from 'mobile-detect';
import ReactMarkdown from 'react-markdown';
import keydown from 'react-keydown';
import { Presentations } from '../api/main';
import Controller from './Controller.jsx';

class Presentation extends Component {
  constructor(props) {
    const md = new MobileDetect(window.navigator.userAgent);

    super(props);
    this.handleChangeSlide = this.handleChangeSlide.bind(this);
    this.state = {
      phone: md.phone()
    };
  }

  _canAdvance() {
    const { presentation } = this.props;
    return presentation.slides.length - 1 > presentation.currentSlide;
  };

  _canReverse() {
    const { presentation } = this.props;
    return presentation.currentSlide > 0;
  }

  componentWillReceiveProps({ keydown }) {
    if (keydown.event) {
      switch (keydown.event.which) {
        case 39:
         this.handleChangeSlide(null, 'next');
         break;
       case 37:
         this.handleChangeSlide(null, 'prev');
         break;
       default:
         return false;
      }
    }
  }

  render() {
    const { dataIsReady, presentation } = this.props;
    const slidesLength = dataIsReady ? presentation.slides.length : 0;
    const slidesStyle = {
      width: `${slidesLength * 100}vw`,
      transform: `translateX(-${presentation.currentSlide * 100}vw)`
    };

    if (!dataIsReady) {
      return <div>Loading...</div>;
    }

    if (this.state.phone) {
      return (
        <Controller
          presentation={presentation}
          changeSlide={this.handleChangeSlide}
          canReverse={this._canReverse()}
          canAdvance={this._canAdvance()}
          slidesLength={slidesLength}/>
      );
    }

    return (
      <div className="container">
        <div className="slides" style={slidesStyle}>
          {presentation.slides.map((slide, i) =>
            <div className="slide" key={i}>
              <div className="slide__content">
                {slide.type === 'image' ?
                  <img src={slide.source}/>
                : <ReactMarkdown source={slide.source}/>}
              </div>
            </div>
          )}
        </div>
        <div className="slides__label">
          Slide {presentation.currentSlide + 1} / {slidesLength}
        </div>
      </div>
    );
  }

  handleChangeSlide(direction) {
    const { presentation } = this.props;

    switch (direction) {
      case 'next':
        if (this._canAdvance()) {
          Presentations.update(presentation._id, {
            $inc: { currentSlide: 1 }
          });
        }
        break;
      case 'prev':
        if (this._canReverse()) {
          Presentations.update(presentation._id, {
            $inc: { currentSlide: -1 }
          });
        }
        break;
      default:
        return false;
    }
  }
}

Presentation.propTypes = {
  dataIsReady: PropTypes.bool.isRequired,
  presentation: PropTypes.object.isRequired
}

export default createContainer(({params}) => {
  const dataHandle = Presentations.findOne(params.id);
  const dataIsReady = dataHandle ? true : false;
  return {
    dataIsReady,
    presentation: dataIsReady ? dataHandle : {},
  };
}, keydown(Presentation));
