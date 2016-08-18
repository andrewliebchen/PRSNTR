import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import MobileDetect from 'mobile-detect';
import keydown from 'react-keydown';
import { Presentations, Slides } from '../api/main';
import Wrapper from './Wrapper.jsx';
import Controller from './Controller.jsx';
import SlidesList from './SlidesList.jsx';
import Loader from './Loader.jsx';
import Info from './Info.jsx';


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
    const { presentation, slides } = this.props;
    return slides.length - 1 > presentation.currentSlide;
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
    const { dataIsReady, presentation, slides, currentUser } = this.props;
    const slidesLength = slides.length;

    if (!dataIsReady) {
      return <Loader/>;
    }

    if (this.state.phone) {
      return (
        <Controller
          presentation={presentation}
          slides={slides}
          changeSlide={this.handleChangeSlide}
          canReverse={this._canReverse()}
          canAdvance={this._canAdvance()}/>
      );
    }

    return (
      <Wrapper
        title={`${presentation.title} | Slides.🎉`}>
        <div className="container presentation__container">
          <SlidesList
            slides={slides}
            currentSlide={presentation.currentSlide}
            prefix="presentation"/>
          <Info
            presentation={presentation}
            slides={slides}
            changeSlide={this.handleChangeSlide}
            canReverse={this._canReverse()}
            canAdvance={this._canAdvance()}
            slidesLength={slidesLength}/>
        </div>
      </Wrapper>
    );
  }

  handleChangeSlide(inc) {
    Meteor.call('changeSlide', {
      id: this.props.presentation._id,
      inc: inc
    });
  }
}

Presentation.propTypes = {
  dataIsReady: PropTypes.bool.isRequired,
  presentation: PropTypes.object.isRequired,
  slides: PropTypes.array.isRequired,
  currentUser: PropTypes.string,
}

export default createContainer(({params}) => {
  const dataHandle =  Meteor.subscribe('presentation', params.id);
  const dataIsReady = dataHandle.ready();
  return {
    dataIsReady,
    presentation: dataIsReady ? Presentations.findOne() : {},
    slides: dataIsReady ? Slides.find(
      {presentation: params.id},
      {sort: {order: 1}}
    ).fetch() : [],
    currentUser: Meteor.userId(),
  };
}, keydown(Presentation));
