import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import Spinner from 'react-spinkit';
import { Presentations } from '../api/main';
import Wrapper from './Wrapper.jsx';

class NewPresentation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
  }

  renderContent() {
    // if (!this.props.currentUser) {
    //   return <AccountsUIWrapper/>;
    // }

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
      <Wrapper
        title="New presentation | Slides 🎉"
        className="container__fixed container__blue">
        <div className="centered__content">
          {this.renderContent()}
        </div>
      </Wrapper>
    );
  }

  handleNewPresentation() {
    this.setState({isLoading: true});
    Meteor.call('createPresentation', {
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

NewPresentation.propTypes = {
  currentUser: PropTypes.string
};

export default createContainer(({params}) => {
  return {
    currentUser: Meteor.userId(),
  };
}, NewPresentation);
