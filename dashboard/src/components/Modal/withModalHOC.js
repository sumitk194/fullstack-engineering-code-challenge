import React from 'react';

const withModalHOC = (WrappedComponent, { submitButtonColor = 'primary', size = 'medium' }) => {
  class VersionedComponent extends React.PureComponent {
    render() {
      return <WrappedComponent submitButtonColor={submitButtonColor} size={size} {...this.props} />;
    }
  }
  return VersionedComponent;
};

export default withModalHOC;
