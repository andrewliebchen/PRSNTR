import React from 'react';
import Spinner from 'react-spinkit';

const Loader = (props) =>
  <div className="loader">
    <Spinner spinnerName="three-bounce" noFadeIn/>
  </div>

export default Loader;
