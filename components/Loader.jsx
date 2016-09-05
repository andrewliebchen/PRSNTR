import React from 'react';

const Spinner = (props) =>
  <div className="sk-three-bounce spinner">
    <div className="sk-child sk-bounce1"/>
    <div className="sk-child sk-bounce2"/>
    <div className="sk-child sk-bounce3"/>
  </div>

const Loader = (props) =>
  <div className="loader">
    <Spinner/>
  </div>

export { Loader, Spinner };
