import React, { Component, PropTypes } from 'react';
import keydown from 'react-keydown';
import { Presentations } from '../api/main';
import Tabs from 'react-simpletabs';
import Textarea from 'react-expanding-textarea';
import Spinner from 'react-spinkit';
import Icon from './Icons.jsx';
import Overlay from './Overlay.jsx';

class NewSlide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      overlay: false,
      type: 'image',
      source: null,
      isLoading: false
    };
  }

  componentWillReceiveProps({ keydown }) {
    if (keydown.event && keydown.event.which === 27) {
      this.setState({overlay: false});
    }
  }

  render() {
    const { overlay, type, source, isLoading } = this.state;
    return (
      <div className="admin__slide__container">
        <div
          className="new-slide-toggle admin__slide"
          onClick={this.handleToggleNewSlide.bind(this)}>
          <span className="new-slide-toggle__label">
            <Icon type="plus" size="2rem"/>
          </span>
        </div>
        <Overlay
          show={overlay}
          toggle={this.handleToggleNewSlide.bind(this)}>
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
                onChange={this.handleSourceChange.bind(this)}
                ref="source"
                autoFocus />
            </Tabs.Panel>
          </Tabs>
          <button
            className="button"
            onClick={this.handleAddSlide.bind(this, true)}>
            {isLoading ? <Spinner spinnerName="three-bounce" noFadeIn/> : 'Add slide'}
          </button>
          <a
            className="new-slide__secondary"
            onClick={this.handleAddSlide.bind(this, false)}>
            Add slide and close
          </a>
        </Overlay>
      </div>
    );
  }

  handleToggleNewSlide() {
    this.setState({overlay: !this.state.overlay});
  }

  handleChangeTab(selectedIndex) {
    this.setState({type: selectedIndex === 1 ? 'image' : 'text'});
  }

  handleSourceChange(event) {
    this.setState({source: event.target.value});
  }

  handleAddSlide(keepOpen) {
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
          if (keepOpen) {
            this.setState({isLoading: false});
            this.refs.source.value = '';
            this.refs.source.focus();
          } else {
            this.setState({
              overlay: false,
              isLoading: false
            });
          }
        }
      });
    }
  }
}

NewSlide.propTypes = {
  presentation: PropTypes.object
};

export default keydown(NewSlide);
