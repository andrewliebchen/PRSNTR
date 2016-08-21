import React, { PropTypes } from 'react';
import DocumentTitle from 'react-document-title';
import classnames from 'classnames';

const Wrapper = (props) => {
  const className = classnames({
    'container': true,
    'container__inverse': props.inverse
  });

  return (
    <DocumentTitle title={props.title}>
      <div className={`${className} ${props.className ? props.className : ''}`}>
        {props.children}
      </div>
    </DocumentTitle>
  );
}

Wrapper.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
  inverse: PropTypes.bool
};

export default Wrapper;
