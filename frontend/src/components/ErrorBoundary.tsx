import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#080a10] flex flex-col items-center justify-center p-8 text-white text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Something went wrong</h1>
          <pre className="bg-white/5 p-4 rounded-lg text-xs font-mono text-white/50 max-w-full overflow-auto">
            {this.state.error?.message}
          </pre>
          <button 
            className="mt-6 px-6 py-2 bg-neon-blue rounded-lg text-black font-bold"
            onClick={() => window.location.reload()}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.children;
  }
}

export default ErrorBoundary;
