import React from 'react';

// Stops one broken screen from turning the whole app blank. Shows a friendly retry instead.
export default class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { failed: false }; }
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(err) { try { console.error('[screen crashed]', err); } catch { /* ignore */ } }
  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <div style={{ minHeight: '60vh', display: 'grid', placeItems: 'center', padding: 24, textAlign: 'center' }}>
        <div>
          <div style={{ fontSize: 42 }}>😵</div>
          <h3 style={{ margin: '10px 0 6px' }}>Something went wrong</h3>
          <p style={{ opacity: 0.7, margin: '0 0 16px', fontSize: 14 }}>This screen hit a problem. Your progress is safe.</p>
          <button style={{ whiteSpace: 'nowrap', padding: '12px 22px', border: 0, borderRadius: 14, background: '#7C3AED', color: '#fff', fontWeight: 800, cursor: 'pointer' }}
            onClick={() => { this.setState({ failed: false }); if (this.props.onReset) this.props.onReset(); }}>Try again</button>
          {this.props.onBack && <div><button style={{ marginTop: 10, background: 'none', border: 0, color: 'inherit', textDecoration: 'underline', cursor: 'pointer' }} onClick={this.props.onBack}>Go back</button></div>}
        </div>
      </div>
    );
  }
}
