import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { Presentations } from '../api/main';
import ContentEditable from 'react-contenteditable';

export default class NewSlide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'image',
      Source: ''
    };
  }

  render() {
    const { type, source } = this.state;
    return (
      <div>
        <select
          defaultValue={type}
          onChange={this.handleChangeType.bind(this)}>
          <option value="image">Image</option>
          <option value="text">Text</option>
        </select>
        {type === 'image' &&
          <input type="text" onChange={this.handleSourceChange.bind(this)}/>}
        {type === 'text' &&
          <ContentEditable
            html={source}
            onChange={this.handleSourceChange.bind(this)}/>}
        <button onClick={this.handleAddSlide.bind(this)}>Add slide</button>
      </div>
    );
  }

  handleChangeType(event) {
    this.setState({type: event.target.value});
  }

  handleSourceChange(event) {
    this.setState({source: event.target.value});
  }

  handleAddSlide() {
    event.preventDefault();
    const { type, source } = this.state;
    if (source) {
      Presentations.update(this.props.presentation._id, {
        $push: {
          slides: {
            type: type,
            source: source
          }
        }
      });
    }
  }
}

NewSlide.propTypes = {
  presentation: PropTypes.object
};
