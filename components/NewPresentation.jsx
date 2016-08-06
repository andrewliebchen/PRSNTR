import React, { Component, PropTypes } from 'react';
import { Presentations } from '../api/main';

export default class NewPresentation extends Component {
  render() {
    return (
      <div className="container">
        <button
          className="button"
          onClick={this.handleNewPresentation}>
          Create a new presentation
        </button>
      </div>
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
