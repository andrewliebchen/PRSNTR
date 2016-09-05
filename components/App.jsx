import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import ReactTooltip from 'react-tooltip';
import classnames from 'classnames';
import MobileDetect from 'mobile-detect';
import keydown from 'react-keydown';
import DocumentTitle from 'react-document-title';
import { Presentations, Slides } from '../api/main';
import Header from './Header.jsx';
import SlidesList from './SlidesList.jsx';
import { Loader } from './Loader.jsx';
import Icon from './Icons.jsx';
import Grid from './Grid.jsx';

class App extends Component {
  constructor(props) {
    const md = new MobileDetect(window.navigator.userAgent);
    super(props);
    this.handleGridToggle = this.handleGridToggle.bind(this);
    this.handleChangeSlide = this.handleChangeSlide.bind(this);
    this.state = {
      phone: md.phone(),
      grid: false
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
    const canEdit = currentUser === presentation.createdBy;

    if (!dataIsReady) {
      return <Loader/>;
    }

    if (this.state.phone) {
      return (
        <div>Controller</div>
      );
    }

    return (
      <DocumentTitle
        title={presentation ? `${presentation.title} | Slides 🎉` : 'Untitled | Slides 🎉'}>
        <div>
          <Header
            presentation={presentation}
            slidesLength={slides.length}
            currentUser={currentUser}
            isPresentation={!this.state.grid}
            toggleGrid={this.handleGridToggle}
            canReverse={this._canReverse()}
            canAdvance={this._canAdvance()}
            changeSlide={this.handleChangeSlide}
            canEdit={canEdit}/>
          <SlidesList
            slides={slides}
            currentSlide={presentation.currentSlide}/>
          <CSSTransitionGroup
            transitionName="grid"
            transitionEnterTimeout={200}
            transitionLeaveTimeout={200}>
            {this.state.grid && <Grid canEdit={canEdit} {...this.props}/>}
          </CSSTransitionGroup>
        </div>
      </DocumentTitle>
    );
  }

  handleChangeSlide(inc) {
    Meteor.call('changeSlide', {
      id: this.props.presentation._id,
      inc: inc
    });
  }

  handleGridToggle() {
    this.setState({grid: !this.state.grid});
  }
}

App.propTypes = {
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
}, keydown(App));
