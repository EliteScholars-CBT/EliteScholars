import React from 'react';
import CrashScreen from './CrashScreen';

// Stops one broken screen from turning the whole app blank. Shows a friendly screen with a retry and a way to the
// website, and reports the crash to the admin.
export default class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { failed: false, error: null, info: null }; }
  static getDerivedStateFromError(error) { return { failed: true, error }; }
  componentDidCatch(err, info) { try { console.error('[screen crashed]', err); } catch { /* ignore */ } this.setState({ info }); }
  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <CrashScreen error={this.state.error} info={this.state.info} dark={false}
        onRetry={() => { this.setState({ failed: false, error: null, info: null }); if (this.props.onReset) this.props.onReset(); }}
        onBack={this.props.onBack} />
    );
  }
}
