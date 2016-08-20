import React, { Component, PropTypes } from 'react';
import Tabs from 'react-simpletabs';
import Textarea from 'react-expanding-textarea';

export default class SlideForm extends Component {
  render() {
    const { tabChange, sourceChange, defaultType, defaultSource } = this.props;
    return (
      <Tabs
        onAfterChange={tabChange.bind(null, this)}
        tabActive={defaultType === 'text' ? 2 : 1}>
        <Tabs.Panel title="Image slide">
          <p>
            Create an image-only slide by pasting the image URL below.
            For example, if the image is in your <code>/public</code> folder in Dropbox, select "Copy Public Link" from your context menu, and paste it here.
          </p>
          <input
            type="url"
            className="input"
            onChange={sourceChange.bind(this)}
            placeholder="http://example.com/portfolio.png"
            ref="source"
            autoFocus/>
        </Tabs.Panel>
        <Tabs.Panel title="Text slide">
          <p>
            Create a text-only slide by writing below.
            You can format your text with Markdown.
          </p>
          <Textarea
            rows="3"
            className="textarea"
            placeholder="Add some content"
            onChange={sourceChange.bind(this)}
            ref="source"
            autoFocus />
        </Tabs.Panel>
      </Tabs>
    );
  }
}

SlideForm.propTypes = {
  tabChange: PropTypes.func,
  sourceChange: PropTypes.func,
  defaultType: PropTypes.oneOf(['image', 'text']),
  defaultSource: PropTypes.string
};
