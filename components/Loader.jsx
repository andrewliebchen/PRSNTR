import React from 'react';
import Spinner from 'react-spinkit';

const Loader = (props) =>
  <div className="loader">
    <Spinner spinnerName="cube-grid" noFadeIn/>
  </div>

export default Loader;
