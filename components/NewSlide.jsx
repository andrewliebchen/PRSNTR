import React, { Component, PropTypes } from 'react';
import keydown from 'react-keydown';
import { Presentations } from '../api/main';
import Tabs from 'react-simpletabs';
import Textarea from 'react-expanding-textarea'

class NewSlide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      overlay: false,
      type: 'image',
      source: null
    };
  }

  componentWillReceiveProps({ keydown }) {
    if (keydown.event && keydown.event.which === 27) {
      this.setState({overlay: false});
    }
  }

  render() {
    const { overlay, type, source } = this.state;
    return (
      <div className="admin__slide__container">
        <div
          className="new-slide-toggle admin__slide"
          onClick={this.handleToggleNewSlide.bind(this)}>
          <span className="new-slide-toggle__label">Add slide</span>
        </div>

        {overlay &&
          <div className="overlay">
            <div className="overlay__content">
              <Tabs onAfterChange={this.handleChangeTab.bind(this)}>
                <Tabs.Panel title="Image">
                  <input
                    type="url"
                    className="input"
                    onChange={this.handleSourceChange.bind(this)}
                    placeholder="http://example.com/portfolio.png"/>
                </Tabs.Panel>
                <Tabs.Panel title="Text">
                  <Textarea
                    rows="3"
                    className="textarea"
                    placeholder="Add some content"
                    onChange={this.handleSourceChange.bind(this)} />
                  <small>Format with Markdown</small>
                </Tabs.Panel>
              </Tabs>
              <button
                className="button"
                onClick={this.handleAddSlide.bind(this)}>
                Add slide
              </button>
            </div>
            <a
              className="overlay__toggle"
              onClick={this.handleToggleNewSlide.bind(this)}>
              Close
            </a>
          </div>
        }
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
      this.setState({overlay: false});
    }
  }
}

NewSlide.propTypes = {
  presentation: PropTypes.object
};

export default keydown(NewSlide);
