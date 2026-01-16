import React from "react";
import classes from "./ErrorBoundary.module.css";
import Button from "../UI/Button/button";
import logger from "../../utils/logger";

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error details for debugging
    logger.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className={classes.errorBoundary}>
          <div className={classes.errorContent}>
            <h1 className={classes.errorTitle}>Oops! Something went wrong</h1>
            <p className={classes.errorMessage}>
              We're sorry, but something unexpected happened. Please try refreshing the page.
            </p>
            {process.env.NODE_ENV === "development" && this.state.error && (
              <details className={classes.errorDetails}>
                <summary>Error Details (Development Only)</summary>
                <pre className={classes.errorStack}>
                  {this.state.error.toString()}
                  {this.state.errorInfo && (
                    <>
                      <br />
                      {this.state.errorInfo.componentStack}
                    </>
                  )}
                </pre>
              </details>
            )}
            <div className={classes.errorActions}>
              <Button onClick={this.handleReset} btnType="Success" size="Medium">
                Try Again
              </Button>
              <Button
                onClick={() => window.location.reload()}
                btnType="Danger"
                size="Medium"
                style={{ marginLeft: "10px" }}
              >
                Reload Page
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
