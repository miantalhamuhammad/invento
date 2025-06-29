import React from "react";
import PropTypes from "prop-types";
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render shows the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to an error reporting service
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div
          style={{
            marginTop: "10rem",
            marginInline: "auto",
            width: "50%",
            maxHeight: "40rem",
            overflow: "hidden",
            overflowY: "auto",
            backgroundColor: "#f8d7da",
            color: "#721c24",
            padding: "20px",
            border: "1px solid #f5c6cb",
            borderRadius: "5px",
          }}
        >
          <h1>Something went wrong.</h1>
          <details style={{ whiteSpace: "pre-wrap" }}>
            {this?.state?.error && this?.state?.error.toString()}
            <br />
            {this?.state?.errorInfo?.componentStack}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
