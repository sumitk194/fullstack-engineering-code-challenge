import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node.isRequired,
};

class ErrorBoundary extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    const { error, errorInfo } = this.state;
    const { children } = this.props;
    if (errorInfo || error) {
      return <h5>Oops, something Went Wrong</h5>;
    }
    return children;
  }
}

ErrorBoundary.propTypes = propTypes;
export default ErrorBoundary;
