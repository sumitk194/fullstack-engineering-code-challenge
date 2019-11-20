import React from 'react';
import Loading from 'react-fullscreen-loading';

export default (props) => (
  <Loading
    background="rgb(107, 107, 107, 0.5)"
    loaderColor="#3498db"
    styles={{zIndex: 2000}}
    {...props}
  />
)
