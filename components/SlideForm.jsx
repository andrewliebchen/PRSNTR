import React, { Component, PropTypes } from 'react';
import Tabs from 'react-simpletabs';
import Textarea from 'react-expanding-textarea';

export default class SlideForm extends Component {
  render() {
    const {
      tabChange,
      sourceChange,
      defaultType,
      defaultSource,
      primaryClick,
      primaryLabel,
      secondaryClick,
      secondaryLabel
    } = this.props;
    return (
      <span>
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
              defaultValue={defaultType === 'image' ? defaultSource : null}
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
              defaultValue={defaultType === 'text' ? defaultSource : null}
              ref="source"
              autoFocus />
          </Tabs.Panel>
        </Tabs>
        <button
          className="button"
          onClick={primaryClick}>
          {primaryLabel}
        </button>
        <a
          className="new-slide__secondary"
          onClick={secondaryClick}>
          {secondaryLabel}
        </a>
      </span>
    );
  }
}

SlideForm.propTypes = {
  tabChange: PropTypes.func,
  sourceChange: PropTypes.func,
  defaultType: PropTypes.oneOf(['image', 'text']),
  defaultSource: PropTypes.string,
  primaryClick: PropTypes.func,
  primaryLabel: PropTypes.node,
  secondaryClick: PropTypes.func,
  secondaryLabel: PropTypes.string
};
