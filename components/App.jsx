import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Presentations } from '../api/main';

class App extends Component {
  _canAdvance() {
    const { presentation } = this.props;
    return presentation.slides.length - 1 > presentation.currentSlide;
  };

  _canReverse() {
    const { presentation } = this.props;
    return presentation.currentSlide > 0;
  }

  render() {
    const { dataIsReady, presentation } = this.props;
    if (!dataIsReady) {
      return <div>Loading...</div>;
    }

    return (
      <div className="container">
        <div className="slides">
          <div className="slide">
            {presentation.slides[presentation.currentSlide]}
          </div>
        </div>
        <div className="slides__label">
          Slide {presentation.currentSlide + 1} / {presentation.slides.length}
        </div>
        <div className="slides__actions">
          <button
            onClick={this.handlePrevSlide.bind(this)}
            disabled={!this._canReverse()}>
            Prev
          </button>
          <button
            onClick={this.handleNextSlide.bind(this)}
            disabled={!this._canAdvance()}>
            Next
          </button>
        </div>
      </div>
    );
  }

  handleNextSlide() {
    const { presentation } = this.props;
    if (this._canAdvance()) {
      Presentations.update(presentation._id, {
        $inc: { currentSlide: 1 }
      });
    }
  }

  handlePrevSlide() {
    const { presentation } = this.props;
    if (this._canReverse()) {
      Presentations.update(presentation._id, {
        $inc: { currentSlide: -1 }
      });
    }
  }
}

export default createContainer(() => {
  const dataHandle = Presentations.findOne();
  const dataIsReady = dataHandle;
  return {
    dataIsReady,
    presentation: dataIsReady ? Presentations.findOne() : [],
  };
}, App);
