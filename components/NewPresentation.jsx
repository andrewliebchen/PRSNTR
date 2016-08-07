import React from 'react';
import NewPresentationButton from './NewPresentationButton.jsx';

const NewPresentation = (props) =>
  <div className="overlay container__blue">
    <div className="overlay__content">
      <NewPresentationButton/>
    </div>
  </div>

export default NewPresentation;
