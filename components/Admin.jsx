import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Presentations, Slides } from '../api/main';
import Wrapper from './Wrapper.jsx';
import NewSlide from './NewSlide.jsx';
import Slide from './Slide.jsx';
import Icon from './Icons.jsx';
import Settings from './Settings.jsx';
import Loader from './Loader.jsx';

const Action = (props) =>
  <a
    className="admin__slide__action"
    onClick={props.handleClick}
    title={props.title}>
    <Icon type={props.type} size="1.5rem"/>
  </a>

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
      return (
        <Wrapper>
          <div>Not allowed</div>
        </Wrapper>
      );
    }

    return (
      <Wrapper title="Admin | Slides.🎉">
        <div className="container container__inverse admin">
          <header className="admin__header">
            <h1 className="admin__title">
              <a
                href={`/${presentation._id}`}
                title="View presentation">
                {presentation.title ? presentation.title : 'Untitled'}
              </a>
            </h1>
            <Settings {...this.props}/>
          </header>
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
                  <div className="admin__slide__overlay">
                    <div className="admin__slide__actions">
                      <Action
                        title="Contrast"
                        handleClick={this.handleBackgroundToggle.bind(this, slide)}
                        type="contrast"/>
                      <Action
                        title="Delete"
                        handleClick={this.handleDelete.bind(this, slide)}
                        type="delete"/>
                    </div>
                  </div>
                </Slide>
              </div>
            )}
          <NewSlide {...this.props}/>
          </div>
        </div>
      </Wrapper>
    );
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
    Meteor.call('toggleBackground', {
      presentationId: this.props.presentation._id,
      slide: slide
    });
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
