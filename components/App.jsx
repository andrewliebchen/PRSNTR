import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Presentations } from '../api/main';

class App extends Component {
  _canAdvance() {
    const { presentation } = this.props;
    return presentation.slides.length > presentation.currentSlide;
  };

  _canReverse() {
    const { presentation } = this.props;
    return presentation.currentSlide > 0;
  }

  render() {
    const { presentation } = this.props;
    if (presentation) {
      return (
        <div>
          Slide {presentation.currentSlide} / {presentation.slides.length}
          <div>
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
    } else {
      return <div>Loading...</div>;
    }
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
  return {
    presentation: Presentations.findOne(),
  };
}, App);
