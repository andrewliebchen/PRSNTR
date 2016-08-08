import React, { Component, PropTypes } from 'react';
import Spinner from 'react-spinkit';
import { Presentations } from '../api/main';

export default class NewPresentationButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
  }

  render() {
    return (
      <button
        className="button"
        onClick={this.handleNewPresentation.bind(this)}>
        {this.state.isLoading ?
          <Spinner spinnerName="three-bounce" noFadeIn/>
        : <span>{this.props.label}</span>}
      </button>
    );
  }

  handleNewPresentation() {
    this.setState({isLoading: true});
    Presentations.insert({
      slides: [{
        type: 'text',
        source: '# Welcome to Slides dot 🎉!\n\nClick to edit this slide, or delete it and start fresh!'
      }],
      currentSlide: 0,
      createdAt: Date.now()
    }, (error, id) => {
      if (id) {
        this.setState({isLoading: false});
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
