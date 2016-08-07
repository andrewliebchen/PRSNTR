import React, { Component, PropTypes } from 'react';
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
      <span>
        <a
          className="admin__settings__toggle"
          onClick={this.handleOverlayToggle}>
          <Icon type="settings" size="1.5rem"/>
        </a>

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
          <button className="button" onClick={this.handleSave.bind(this)}>
            Save changes
          </button>
        </Overlay>
      </span>
    );
  }

  handleOverlayToggle() {
    this.setState({overlay: !this.state.overlay});
  }

  handleSave() {
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

export default keydown(Settings);
