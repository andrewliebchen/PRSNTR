import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import SwapArray from 'swap-array';
import { Presentations } from '../api/main';

class NewSlide extends Component {
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

class Admin extends Component {
  render() {
    const { dataIsReady, presentation } = this.props;

    if (!dataIsReady) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h1>Admin</h1>
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Source</th>
              <th>Preview</th>
              <th/>
            </tr>
          </thead>
          <tbody>
            {presentation.slides.map((slide, i) =>
              <tr key={i}>
                <td>{slide.type}</td>
                <td>{slide.source}</td>
                <td>
                  {slide.type === 'image' ?
                    <img src={slide.source} width="50px"/>
                  : <pre>{slide.source}</pre>}
                </td>
                <td>
                  <button
                    onClick={this.handleMoveUp.bind(this, i)}
                    disabled={i === 0}>
                    👆
                  </button>
                  <button
                    onClick={this.handleMoveDown.bind(this, i)}
                    disabled={i === presentation.slides.length - 1}>
                    👇
                  </button>
                  <button onClick={this.handleDelete.bind(this, slide)}>❌</button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <NewSlide {...this.props}/>
      </div>
    );
  }

  handleMoveUp(index) {
    const { presentation } = this.props;
    Presentations.update(presentation._id, {
      $set: {
        slides: SwapArray(presentation.slides, index, index - 1)
      }
    });
  }

  handleMoveDown(index) {
    const { presentation } = this.props;
    Presentations.update(presentation._id, {
      $set: {
        slides: SwapArray(presentation.slides, index, index + 1)
      }
    });
  }

  handleDelete(slide) {
    Presentations.update(this.props.presentation._id, {
      $pull: {
        slides: slide
      }
    });
  }
}

Admin.propTypes = {
  dataIsReady: PropTypes.bool.isRequired,
  presentation: PropTypes.object.isRequired
}

export default createContainer(({params}) => {
  const dataHandle = Presentations.findOne(params.id);
  const dataIsReady = dataHandle ? true : false;
  return {
    dataIsReady,
    presentation: dataIsReady ? dataHandle : {},
  };
}, Admin);
