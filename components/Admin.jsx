import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import SwapArray from 'swap-array';
import { Presentations } from '../api/main';
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
  render() {
    const { dataIsReady, presentation, currentUser } = this.props;

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
      <Wrapper title="Admin | Slides dot 🎉">
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
            {presentation.slides.map((slide, i) =>
              <div className="admin__slide__container" key={i}>
                <Slide
                  slide={slide}
                  prefix="admin">
                  <div className="admin__slide__overlay">
                    <div className="admin__slide__actions">
                      {/*<Action title="Edit" handleClick={null} type="edit"/>*/}
                      {i > 0 &&
                        <Action
                          title="Move left"
                          handleClick={this.handleMoveUp.bind(this, i)}
                          type="arrow-left"/>}
                      {i < presentation.slides.length &&
                        <Action
                          title="Move right"
                          handleClick={this.handleMoveDown.bind(this, i)}
                          type="arrow-right"/>}
                      <Action
                        title="Delete"
                        handleClick={this.handleDelete.bind(this, slide)}
                        type="delete"/>
                      <Action
                        title="Contrast"
                        handleClick={this.handleBackgroundToggle.bind(this, slide)}
                        type="contrast"/>
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

  handleMoveUp(index) {
    const { presentation } = this.props;
    if (index !== 0) {
      Presentations.update(presentation._id, {
        $set: {
          slides: SwapArray(presentation.slides, index, index - 1)
        }
      });
    }
  }

  handleMoveDown(index) {
    const { presentation } = this.props;
    if (index !== presentation.slides.length - 1) {
      Presentations.update(presentation._id, {
        $set: {
          slides: SwapArray(presentation.slides, index, index + 1)
        }
      });
    }
  }

  handleDelete(slide) {
    if (window.confirm('You sure you want to delete this slide?')) {
      Presentations.update(this.props.presentation._id, {
        $pull: {
          slides: slide
        }
      });
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
  currentUser: PropTypes.string,
}

export default createContainer(({params}) => {
  const dataHandle = Presentations.findOne(params.id);
  const dataIsReady = dataHandle ? true : false;
  return {
    dataIsReady,
    presentation: dataIsReady ? dataHandle : {},
    currentUser: Meteor.userId(),
  };
}, Admin);
