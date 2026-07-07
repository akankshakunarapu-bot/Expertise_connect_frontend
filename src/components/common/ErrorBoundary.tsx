import React, { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '../ui/Button';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/dashboard';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-900 p-6 text-center select-none transition-colors duration-200">
          <div className="max-w-md w-full bg-white dark:bg-dark-800 rounded-3xl border border-gray-100 dark:border-dark-700 shadow-xl p-8 flex flex-col items-center">
            <div className="h-12 w-12 rounded-xl bg-red-50 dark:bg-red-950/20 text-red-500 flex items-center justify-center mb-4.5">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
              Application Error
            </h2>
            <p className="text-sm text-gray-505 dark:text-gray-400 mb-6 max-w-xs leading-normal">
              An unexpected error occurred. Please click below to return to the workspace dashboard safely.
            </p>
            <Button variant="primary" fullWidth onClick={this.handleReset}>
              Go to Dashboard
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
export default ErrorBoundary;
