import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import ReactTooltip from 'react-tooltip';
import { Presentations, Slides } from '../api/main';
import Wrapper from './Wrapper.jsx';
import Header from './Header.jsx';
import NewSlide from './NewSlide.jsx';
import EditSlide from './EditSlide.jsx';
import Slide from './Slide.jsx';
import SlideAction from './SlideAction.jsx'
import Loader from './Loader.jsx';
import Icon from './Icons.jsx';
import Login from './Login.jsx';

class Admin extends Component {
  constructor(props) {
    super(props);
    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
    this.state = {
      dragging: null,
      dragOver: null
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.slides !== this.props.slides || nextState.dragOver !== this.state.dragOver;
  }

  render() {
    const { dataIsReady, presentation, currentUser, slides } = this.props;

    if (!dataIsReady) {
      return <Loader/>;
    }

    if (currentUser !== presentation.createdBy) {
      return <Login/>;
    }

    return (
      <Wrapper
        title="Admin | Slides 🎉"
        className="admin"
        inverse>
        <Header presentation={presentation} currentUser={currentUser}>
          <div
            className="block"
            data-tip
            data-for="start">
            <Icon
              type="play"
              size="1.5rem"
              onClick={this.handleViewPresentation.bind(this)}/>
          </div>
          <ReactTooltip id="start" effect="solid" class="tooltip">
            Start presentation
          </ReactTooltip>
        </Header>
        <div className="admin__slides">
          {slides.map((slide, i) =>
            <div className="admin__slide__container" key={i}>
              <Slide
                slide={slide}
                prefix="admin"
                isDragOver={this.state.dragOver === slide._id}
                dragStart={this.handleDragStart}
                dragEnd={this.handleDragEnd}
                dragOver={this.handleDragOver}
                draggable>
                <div className="admin__slide__actions">
                  <EditSlide slide={slide}/>
                  <SlideAction
                    title="Contrast"
                    handleClick={this.handleBackgroundToggle.bind(this, slide)}
                    type="contrast"/>
                  <SlideAction
                    title="Delete"
                    handleClick={this.handleDelete.bind(this, slide)}
                    type="delete"/>
                </div>
              </Slide>
            </div>
          )}
        <NewSlide {...this.props}/>
        </div>
      </Wrapper>
    );
  }

  handleViewPresentation() {
    window.location.href = `/${this.props.presentation._id}`;
  }

  handleDragStart(slide) {
    this.setState({dragging: slide._id});
  }

  handleDragOver(slide) {
    this.setState({dragOver: slide._id});
  }

  handleDragEnd(slide) {
    Meteor.call('reOrderSlide', {
      dragging: this.state.dragging,
      dragOver: this.state.dragOver
    }, (error, success) => {
      if (success) {
        this.setState({
          dragging: null,
          dragOver: null
        });
      }
    });
  }

  handleDelete(slide) {
    if (window.confirm('You sure you want to delete this slide?')) {
      Meteor.call('deleteSlide', slide._id);
    }
  }

  handleBackgroundToggle(slide) {
    Meteor.call('toggleBackground', slide);
  }
}

Admin.propTypes = {
  dataIsReady: PropTypes.bool.isRequired,
  presentation: PropTypes.object.isRequired,
  slides: PropTypes.array.isRequired,
  currentUser: PropTypes.string
};

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
}, Admin);
