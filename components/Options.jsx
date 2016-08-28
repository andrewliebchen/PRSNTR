import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import keydown from 'react-keydown';
import ReactTooltip from 'react-tooltip';
import { Presentations } from '../api/main';
import Icon from './Icons.jsx';
import Overlay from './Overlay.jsx';

class Options extends Component {
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
        <div
          className="block"
          data-tip
          data-for="options">
          <Icon
            type="rulers"
            size="1.5rem"
            onClick={this.handleOverlayToggle}
            title="Edit presentation"/>
        </div>
        <ReactTooltip id="options" effect="solid" class="tooltip">
          Presentation options
        </ReactTooltip>
        <Overlay
          show={this.state.overlay}
          toggle={this.handleOverlayToggle}>
          <div className="field">
            <label>
              Presentation title
            </label>
            <input
              type="text"
              defaultValue={presentation.title ? presentation.title : 'Untitled'}
              ref="title"/>
          </div>
          <div className="field">
            <label>
              Presentation length, in minutes
            </label>
            <input
              type="number"
              defaultValue={presentation.time ? presentation.time : null}
              ref="time"/>
          </div>
          <div className="buttons">
            <button onClick={this.handleSave.bind(this)}>
              Save changes
            </button>
          </div>
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

Options.propTypes = {
  presentation: PropTypes.object
};

export default keydown(Options);
