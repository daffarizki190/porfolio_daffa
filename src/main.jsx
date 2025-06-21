import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Error boundary component to catch rendering errors
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('React Error Boundary caught an error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
          <h1 style={{ color: '#e53e3e' }}>Something went wrong</h1>
          <p>The application encountered an error. Please try refreshing the page.</p>
          <details style={{ whiteSpace: 'pre-wrap', marginTop: '10px' }}>
            <summary>Error details</summary>
            <p>{this.state.error && this.state.error.toString()}</p>
            <p>Component Stack:</p>
            <pre>{this.state.errorInfo && this.state.errorInfo.componentStack}</pre>
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}

try {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  
  if (!document.getElementById('root')) {
    console.error('Root element not found in the DOM');
    document.body.innerHTML = '<div style="padding: 20px; font-family: Arial, sans-serif;"><h1 style="color: #e53e3e;">Error</h1><p>Root element not found in the DOM. Please check your HTML structure.</p></div>';
  } else {
    root.render(
      <React.StrictMode>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </React.StrictMode>
    );
  }
} catch (error) {
  console.error('Error during React initialization:', error);
  document.body.innerHTML = `<div style="padding: 20px; font-family: Arial, sans-serif;"><h1 style="color: #e53e3e;">Error</h1><p>Failed to initialize the application: ${error.message}</p></div>`;
}