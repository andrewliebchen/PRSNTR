import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { Presentations } from '../api/main';
import Tabs from 'react-simpletabs';
import ContentEditable from 'react-contenteditable';

export default class NewSlide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'image',
      source: null
    };
  }

  render() {
    const { type, source } = this.state;
    return (
      <div>
        <Tabs onAfterChange={this.handleChangeTab.bind(this)}>
          <Tabs.Panel title="Image">
            <input type="text" onChange={this.handleSourceChange.bind(this)}/>
          </Tabs.Panel>
          <Tabs.Panel title="Text">
            <ContentEditable html={source} onChange={this.handleSourceChange.bind(this)}/>
          </Tabs.Panel>
        </Tabs>
        <button onClick={this.handleAddSlide.bind(this)}>Add slide</button>
      </div>
    );
  }

  handleChangeTab(selectedIndex) {
    this.setState({type: selectedIndex === 1 ? 'image' : 'text'});
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
