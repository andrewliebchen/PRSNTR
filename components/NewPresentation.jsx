import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Presentations } from '../api/main';
import DocumentTitle from 'react-document-title';
import Login from './Login.jsx';
import Logo from './Logo.jsx';
import { Spinner } from './Loader.jsx';

class NewPresentation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
  }

  render() {
    if (!this.props.currentUser) {
      return <Login />;
    }

    return (
      <DocumentTitle
        title="New presentation | Slides 🎉">
        <div className="container__fixed container__blue">
          <div className="centered__content buttons">
            <button onClick={this.handleNewPresentation.bind(this)}>
              {this.state.isLoading ?
                <Spinner/>
              : <span>Create a new presentation</span>}
            </button>
            <a onClick={this.handleSignOut.bind(this)}>Or sign out</a>
          </div>
        </div>
      </DocumentTitle>
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

  handleSignOut() {
    Meteor.logout();
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
