import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import Spinner from 'react-spinkit';
import { Presentations } from '../api/main';

export default class NewPresentation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
  }

  renderContent() {
    if (!Meteor.currentUser) {
      return <div>Log in, duh!</div>;
    }

    return (
      <button
        className="button"
        onClick={this.handleNewPresentation.bind(this)}>
        {this.state.isLoading ?
          <Spinner spinnerName="three-bounce" noFadeIn/>
        : <span>Create a new presentation</span>}
      </button>
    );
  }

  render() {
    return (
      <div className="overlay container__blue">
        <div className="overlay__content">
          {this.renderContent()}
        </div>
      </div>
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
      createdAt: Date.now(),
      createdBy: Meteor.userId()
    }, (error, id) => {
      if (id) {
        this.setState({isLoading: false});
        window.location.href = `/${id}`;
      }
    });
  }
}
