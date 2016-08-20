import React, { Component, PropTypes } from 'react';
import Overlay from './Overlay.jsx';
import SlideForm from './SlideForm.jsx';

export default class EditSlide extends Component {
  constructor(props) {
    super(props);
    this.handleChangeTab = this.handleChangeTab.bind(this);
    this.handleSourceChange = this.handleSourceChange.bind(this);
    this.state = {
      overlay: false,
      type: this.props.slide.type,
      source: this.props.slide.source
    };
  }

  render() {
    const { overlay, type, source } = this.state;
    return (
      <span>
        <a onClick={this.handleToggleEditSlide.bind(this)}>Edit</a>
        <Overlay
          show={overlay}
          toggle={this.handleToggleEditSlide.bind(this)}>
          <SlideForm
            tabChange={this.handleChangeTab}
            sourceChange={this.handleSourceChange}
            defaultType={type}
            defaultSource={source}/>
        </Overlay>
      </span>
    );
  }

  handleToggleEditSlide() {
    this.setState({overlay: !this.state.overlay});
  }

  handleChangeTab(selectedIndex) {
    this.setState({type: selectedIndex === 1 ? 'image' : 'text'});
  }

  handleSourceChange(event) {
    this.setState({source: event.target.value});
  }
}
