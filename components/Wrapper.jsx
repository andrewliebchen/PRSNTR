import React, { PropTypes } from 'react';
import DocumentTitle from 'react-document-title';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

const Wrapper = (props) =>
  <DocumentTitle title={props.title}>
    <div className="wrapper">
      <AccountsUIWrapper/>
      {props.children}
    </div>
  </DocumentTitle>

Wrapper.propTypes = {
  title: PropTypes.string
};

export default Wrapper;
