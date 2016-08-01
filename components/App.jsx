import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Presentations } from '../api/main';

class App extends Component {
  render() {
    const { presentation } = this.props;
    if (presentation) {
      return (
        <div onClick={this.handleAdvanceSlide.bind(this)}>
          Slide {presentation.currentSlide} / {presentation.slides.length}
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }

  handleAdvanceSlide() {
    const { presentation } = this.props;
    Presentations.update(presentation._id, {
      $inc: { currentSlide: 1 }
    });
  }
}

export default createContainer(() => {
  return {
    presentation: Presentations.findOne(),
  };
}, App);
