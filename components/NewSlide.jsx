import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { Presentations } from '../api/main';

export default class NewSlide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'image'
    };
  }

  render() {
    const { type } = this.state;
    return (
      <div>
        <select
          defaultValue={type}
          onChange={this.handleChangeType.bind(this)}>
          <option value="image">Image</option>
          <option value="text">Text</option>
        </select>
        {type === 'image' && <input type="text" ref="source"/>}
        {type === 'text' && <textarea ref="source"/>}
        <button onClick={this.handleAddSlide.bind(this)}>Add slide</button>
      </div>
    );
  }

  handleChangeType(event) {
    this.setState({type: event.target.value});
  }

  handleAddSlide() {
    event.preventDefault();
    Presentations.update(this.props.presentation._id, {
      $push: {
        slides: {
          type: this.state.type,
          source: this.refs.source.value
        }
      }
    });
    this.refs.source.value = '';
  }
}

NewSlide.propTypes = {
  presentation: PropTypes.object
};
