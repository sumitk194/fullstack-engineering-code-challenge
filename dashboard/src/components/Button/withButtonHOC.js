import React from 'react';

const withButtonHOC = (WrappedComponent, color) => {
  class VersionedComponent extends React.PureComponent {
    render() {
      return <WrappedComponent color={color} {...this.props} />;
    }
  }
  return VersionedComponent;
};

export default withButtonHOC;
