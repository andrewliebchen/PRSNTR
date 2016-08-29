import React, { PropTypes } from 'react';

const Logo = (props) =>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    enable-background="new 0 0 64 64"
    width={props.size}
    height={props.size}
    className={`logo logo__${props.color}`}>
    <path className="logo__color1" d="m2 61l8.6-3-6.5-3z"/>
    <path className="logo__color2" d="m26.9 36.4l-12.1-12.2-2 5.6z"/>
    <path className="logo__color1" d="m12.8 29.8l-2.2 6.3 26.8 12.5 1.3-.4-11.8-11.8z"/>
    <path className="logo__color2" d="m8.5 42.4l20 9.3 8.9-3.1-26.8-12.5z"/>
    <path className="logo__color1" d="m6.3 48.7l13.2 6.2 9-3.2-20-9.3z"/>
    <path className="logo__color2" d="m6.3 48.7l-2.2 6.3 6.5 3 8.9-3.1z"/>
    <path d="m31.9 31.2c6.7 6.6 10.2 14 7.8 16.4-2.5 2.4-9.9-1-16.7-7.7-6.7-6.6-10.2-14-7.8-16.4 2.5-2.4 9.9 1.1 16.7 7.7" className="logo__color3"/>
    <path d="m23.5 14.5c-1.6-2.3.1-3.3 2.3-2.9-2.1-2.5-.8-4.3 2.5-3.6 1 .2-.4 1.9-1.3 1.9 2.7 2 1.2 4.2-1.7 3.7 2.6 3.5-1.8 2.6-3.8 2.8-.5 2.6 2.5 5.6 1.5 5.6-2.2 0-5.8-8.3.5-7.5" className="logo__color4"/>
    <path d="m44.5 19.3c-1.5.7-5.7-5.9-.5-6-3-2.7-2.6-4 1.4-4.1-4.6-4.6 2.7-6.2 3.4-3.8.2.7-2.2-.6-3 .7-.9 1.5 5.6 5.4-1.1 5.1 2.5 2.5 2.6 3.7-1.3 4.1.5.8 2.1 3.6 1.1 4" className="logo__color5"/>
    <path d="m46.2 34.9l1.5-1.3c0 0 1.4 2.1 2.4 2.9.8-3.6.6-5.7 4.7-3.3-2.3-6.2 1.5-3.9 5.2-2.2-.2-1.6 0-1.4 1.6-1.9 1.4 5.3-2.4 3.7-5.4 2 1.8 4.8-.1 4.5-3.9 2.9-.1 2-.7 4.3-1.9 4.5-1.4.4-4.2-3.6-4.2-3.6" className="logo__color6"/>
    <path d="m35 20.1c-1.8 2.4-4.7 3.7-6.8 5.8-2.2 2.2-3.5 8.2-3.5 8.2s.8-6.3 2.9-8.7c1.9-2.2 4.7-3.8 6.2-6.3 2.6-4.6.2-10.6-3.2-14.1.7-.6 1.7-1.4 2.2-2 3.3 4.1 6.1 12 2.2 17.1" className="logo__color7"/>
    <path d="m38.1 25.2c-2.6 1.9-4.5 4.7-6.3 7.3-1.6 2.3-6.7 5.2-6.7 5.2s4.8-3.3 6.3-5.7c1.8-3 3.6-6.1 6.4-8.3 5.6-4.3 13.7-3.9 20-1.6-.4.9-1.1 2.8-1.1 2.8s-13.3-3.6-18.6.3" className="logo__color5"/>
    <g className="logo__color4">
      <path d="m49.2 24.7c-1.7 2.2-2.5 4.9-3.8 7.4-1.2 2.3-2.8 4.5-5.1 5.7-2.6 1.3-8.3.9-8.3.9s5.7-.1 8.1-1.7c2.4-1.6 3.7-4.4 4.6-7 1.8-5 4-10.4 9.2-12.6.3.9 1 2.8 1 2.8s-2.9.8-5.7 4.5"/>
      <path transform="matrix(.707-.7072.7072.707-8.3165 8.458)" d="m4 12.3h4v4h-4z"/>
    </g>
    <path transform="matrix(.7071-.7071.7071.7071-13.4747 13.8633)" className="logo__color5" d="m8 21.2h4v4h-4z"/>
    <path transform="matrix(.707-.7072.7072.707-1.905 15.0572)" className="logo__color6" d="m15.2 7.8h4v4h-4z"/>
    <path transform="matrix(.7071-.7071.7071.7071-16.8081 46.7362)" className="logo__color7" d="m46 41.7h4v4h-4z"/>
    <path transform="matrix(.7071-.7071.7071.7071-25.5139 45.1176)" className="logo__color6" d="m39.7 51.4h4v4h-4z"/>
    <path transform="matrix(.7071-.7071.7071.7071-23.4619 54.546)" className="logo__color5" d="m52.1 53.6h4v4h-4z"/>
    <g className="logo__color4">
      <path transform="matrix(.7071-.7071.7071.7071-13.5212 52.7722)" d="m54.9 40.7h4v4h-4z"/>
      <path transform="matrix(.7071-.7071.7071.7071 6.223 40.6826)" d="m50.2 10.8h4v4h-4z"/>
    </g>
    <path transform="matrix(.7071-.7071.7071.7071-14.6842 24.2063)" className="logo__color6" d="m19.9 27.8h4v4h-4z"/>
  </svg>

Logo.defaultProps = {
  size: '3rem',
  color: 'color'
};

Logo.propTypes = {
  size: PropTypes.string,
  color: PropTypes.oneOf(['color', 'light', 'dark'])
};

export default Logo;
