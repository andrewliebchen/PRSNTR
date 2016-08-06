import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import SwapArray from 'swap-array';
import { Presentations } from '../api/main';
import NewSlide from './NewSlide.jsx';
import Slide from './Slide.jsx';

class Admin extends Component {
  render() {
    const { dataIsReady, presentation } = this.props;

    if (!dataIsReady) {
      return <div>Loading...</div>;
    }

    return (
      <div className="container admin__container">
        <div className="admin__slides">
          {presentation.slides.map((slide, i) =>
            <div className="admin__slide__container" key={i}>
              <Slide
                slide={slide}
                prefix="admin">
                <div className="admin__slide__overlay">
                  <div className="admin__slide__actions">
                    <button
                      onClick={this.handleMoveUp.bind(this, i)}
                      disabled={i === 0}>
                      👆
                    </button>
                    <button
                      onClick={this.handleMoveDown.bind(this, i)}
                      disabled={i === presentation.slides.length - 1}>
                      👇
                    </button>
                    <button onClick={this.handleDelete.bind(this, slide)}>❌</button>
                  </div>
                </div>
              </Slide>
            </div>
          )}
        <NewSlide {...this.props}/>
        </div>
      </div>
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
    Presentations.update(this.props.presentation._id, {
      $pull: {
        slides: slide
      }
    });
  }
}

Admin.propTypes = {
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
}, Admin);
