import React, { Component } from 'react';

export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    console.log('----getDerivedStateFromError----', error);
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.log('----componentDidCatch----', error);
    console.log('info.componentStack', info.componentStack);
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return children;
  }
}
