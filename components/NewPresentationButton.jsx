import React, { Component, PropTypes } from 'react';
import { Presentations } from '../api/main';

export default class NewPresentationButton extends Component {
  render() {
    return (
      <button
        className="button"
        onClick={this.handleNewPresentation}>
        {this.props.label}
      </button>
    );
  }

  handleNewPresentation() {
    Presentations.insert({
      slides: [{
        type: 'text',
        source: '# Welcome to Slides dot 🎉!\n\nClick to edit this slide, or delete it and start fresh!'
      }],
      currentSlide: 0,
      createdAt: Date.now()
    }, (error, id) => {
      if (id) {
        window.location.href = `/${id}`;
      }
    });
  }
}

NewPresentationButton.propTypes = {
  label: PropTypes.string
};

NewPresentationButton.defaultProps = {
  label: 'Create a new presentation'
};
