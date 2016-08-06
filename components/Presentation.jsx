import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import MobileDetect from 'mobile-detect';
import keydown from 'react-keydown';
import { Presentations } from '../api/main';
import Controller from './Controller.jsx';
import Slides from './Slides.jsx';

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
          if (this._canAdvance()) {
            this.handleChangeSlide(1);
          }
          break;
        case 37:
          if (this._canReverse()) {
            this.handleChangeSlide(-1);
          }
          break;
        default:
          return false;
      }
    }
  }

  render() {
    const { dataIsReady, presentation } = this.props;
    const slidesLength = dataIsReady ? presentation.slides.length : 0;

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
      <div className="container presentation__container">
        <Slides
          slides={presentation.slides}
          currentSlide={presentation.currentSlide}
          prefix="presentation"/>
        <div className="info">

          <div className="info__item">
            {presentation.currentSlide + 1} | {slidesLength}
          </div>
          <a
            className={`info__item ${presentation.currentSlide === 0 ? 'is-disabled' : ''}`}
            onClick={this.handleChangeSlide.bind(null, -(slidesLength - (slidesLength - presentation.currentSlide)))}>
            🏃
          </a>
          <a
            className={`info__item ${!this._canReverse() ? 'is-disabled' : ''}`}
            onClick={this.handleChangeSlide.bind(null, -1)}>
            👈
          </a>
          <a
            className={`info__item ${!this._canAdvance() ? 'is-disabled' : ''}`}
            onClick={this.handleChangeSlide.bind(null, 1)}
            disabled={!this._canAdvance()}>
            👉
          </a>
        </div>
      </div>
    );
  }

  handleChangeSlide(inc) {
    Presentations.update(this.props.presentation._id, {
      $inc: { currentSlide: inc }
    });
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
