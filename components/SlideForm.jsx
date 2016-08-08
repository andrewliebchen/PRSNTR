import React, { Component, PropTypes } from 'react';
import { Presentations } from '../api/main';
import Tabs from 'react-simpletabs';
import Textarea from 'react-expanding-textarea';
import Spinner from 'react-spinkit';

export default class SlideForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: this.props.presentation.slides[this.props.index],
      source: null,
      isLoading: false
    };
  }

  render() {
    const { type, source, isLoading } = this.state;
    return (
      <div>
        <Tabs onAfterChange={this.handleChangeTab.bind(this)}>
          <Tabs.Panel title="Image slide">
            <p>
              Create an image-only slide by pasting the image URL below.
              For example, if the image is in your <code>/public</code> folder in Dropbox, select "Copy Public Link" from your context menu, and paste it here.
            </p>
            <input
              type="url"
              className="input"
              onChange={this.handleSourceChange.bind(this)}
              placeholder="http://example.com/portfolio.png"/>
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
              onChange={this.handleSourceChange.bind(this)} />
          </Tabs.Panel>
        </Tabs>
        <button
          className="button"
          onClick={this.handleAddSlide.bind(this)}>
          {isLoading ? <Spinner spinnerName="three-bounce" noFadeIn/> : 'Save changes'}
        </button>
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
      this.setState({isLoading: true});
      Presentations.update(this.props.presentation._id, {
        $push: {
          slides: {
            type: type,
            source: source
          }
        }
      }, (error, success) => {
        if (success) {
          this.setState({
            isLoading: false
          });
        }
      });
    }
  }
}

SlideForm.propTypes = {
  presentation: PropTypes.object,
  index: PropTypes.number
};
