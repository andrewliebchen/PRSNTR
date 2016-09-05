import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import ReactTooltip from 'react-tooltip';
import { Presentations, Slides } from '../api/main';
import NewSlide from './NewSlide.jsx';
import EditSlide from './EditSlide.jsx';
import Slide from './Slide.jsx';
import SlideAction from './SlideAction.jsx'
import { Loader } from './Loader.jsx';
import Icon from './Icons.jsx';

export default class Grid extends Component {
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
    const { dataIsReady, presentation, currentUser, slides, canEdit } = this.props;

    if (!dataIsReady) {
      return <Loader/>;
    }

    return (
      <div className="grid container container__inverse">
        <div className="grid__slides">
          {slides.map((slide, i) =>
            <div className="grid__slide__container" key={i}>
              <Slide
                slide={slide}
                prefix="grid"
                isDragOver={this.state.dragOver === slide._id}
                dragStart={this.handleDragStart}
                dragEnd={this.handleDragEnd}
                dragOver={this.handleDragOver}
                draggable={canEdit}>
                {canEdit &&
                  <div className="grid__slide__actions">
                    <EditSlide slide={slide}/>
                    <SlideAction
                      tip="contrast"
                      handleClick={this.handleBackgroundToggle.bind(this, slide)}
                      type="contrast"/>
                    <SlideAction
                      tip="delete"
                      handleClick={this.handleDelete.bind(this, slide)}
                      type="delete"/>
                    <ReactTooltip id="edit" effect="solid" class="tooltip">
                      Edit
                    </ReactTooltip>
                    <ReactTooltip id="contrast" effect="solid" class="tooltip">
                      Contrast
                    </ReactTooltip>
                    <ReactTooltip id="delete" effect="solid" class="tooltip">
                      Delete
                    </ReactTooltip>
                  </div>}
              </Slide>
            </div>
          )}
        {canEdit && <NewSlide {...this.props}/>}
        </div>
      </div>
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

Grid.propTypes = {
  dataIsReady: PropTypes.bool.isRequired,
  presentation: PropTypes.object.isRequired,
  slides: PropTypes.array.isRequired,
  currentUser: PropTypes.string,
  canEdit: PropTypes.bool
};
