import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import keydown from 'react-keydown';
import { Presentations } from '../api/main';
import Icon from './Icons.jsx';
import Overlay from './Overlay.jsx';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.handleOverlayToggle = this.handleOverlayToggle.bind(this);

    this.state = {
      overlay: false
    };
  }

  componentWillReceiveProps({ keydown }) {
    if (keydown.event && keydown.event.which === 27) {
      this.setState({overlay: false});
    }
  }

  render() {
    const { presentation } = this.props;
    return (
      <div className="admin__header__item">
        <div className="block">
          <Icon
            type="rulers"
            size="1.5rem"
            onClick={this.handleOverlayToggle}
            title="Edit presentation"/>
        </div>
        <Overlay
          show={this.state.overlay}
          toggle={this.handleOverlayToggle}>
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
          <div className="form-group">
            <label className="label">
              Presentation time
            </label>
            <input
              type="number"
              className="input"
              defaultValue={presentation.time ? presentation.time : null}
              ref="time"/>
            <small>Target length of the presentation, in minutes</small>
          </div>
          <button className="button" onClick={this.handleSave.bind(this)}>
            Save changes
          </button>
        </Overlay>
      </div>
    );
  }

  handleOverlayToggle() {
    this.setState({overlay: !this.state.overlay});
  }

  handleSave() {
    console.log('click');
    Meteor.call('updatePresentation', {
      id: this.props.presentation._id,
      title: this.refs.title.value,
      time: this.refs.time.value,
      updatedAt: Date.now()
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

export default keydown(Settings);
