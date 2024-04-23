import React from "react";

interface Props {
  children?: React.ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.log("Error boundary -- Uncaught error: ", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return <p>Sorry... Something goes wrong!</p>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
