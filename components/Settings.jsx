import React, { Component, PropTypes } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import { Presentations } from '../api/main';
import Icon from './Icons.jsx';

export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.handleOverlayToggle = this.handleOverlayToggle.bind(this);

    this.state = {
      overlay: false
    };
  }

  render() {
    const { presentation } = this.props;
    return (
      <span>
        <a
          className="settings__toggle"
          onClick={this.handleOverlayToggle}>
          <Icon type="settings" size="1.5rem"/>
        </a>
        {this.state.overlay &&
          <CSSTransitionGroup
            transitionName="overlay"
            transitionEnterTimeout={250}
            transitionLeaveTimeout={200}>
            <div className="overlay">
              <div className="overlay__content">
                <div className="form-group">
                  <label className="label">
                    Presentation title
                  </label>
                  <input
                    type="text"
                    className="input"
                    defaultValue={presentation.title ? presentation.title : 'Untitled'}
                    ref="title"/>
                </div>
                <button className="button" onClick={this.handleSave.bind(this)}>
                  Save changes
                </button>
              </div>
              <a
                className="overlay__toggle"
                onClick={this.handleOverlayToggle}>
                <Icon type="close" size="2rem"/>
              </a>
            </div>
        </CSSTransitionGroup>}
      </span>
    );
  }

  handleOverlayToggle() {
    this.setState({overlay: !this.state.overlay});
  }

  handleSave() {
    console.log(this.refs.title.value);
    Presentations.update(this.props.presentation._id, {
      $set: {
        title: this.refs.title.value
      }
    }, (error, success) => {
      if (success) {
        this.setState({overlay: false});
      }
    });
  }
}

Settings.propTypes = {
  presentation: PropTypes.object
};
